<script module>
	export type ResultRow = { [key: string[number]]: string | number | Date };
</script>

<script lang="ts">
	// import { enhance } from '$app/forms';
	import Dropzone from '$lib/components/Dropzone.svelte';
	import { DownloadCloud } from 'lucide-svelte';
	// import { createUploader } from '$lib/utils/uploadthing';
	// import { Uploader } from '@uploadthing/svelte';
	import { getDBState, getUserState, type Column } from '$lib/userStore.svelte';
	import Paparse from 'papaparse';
	import { goto } from '$app/navigation';

	// const uploader = createUploader('reportUploader', {
	// 	onClientUploadComplete: (res) => {
	// 		console.log(res[0]);
	// 	},
	// 	onUploadError: (err) => {
	// 		console.error(err);
	// 	}
	// });

	let { state: userState, addFile } = getUserState();
	let { getTransaction } = getDBState();

	let isParsing = $state(false);

	function isValidDate(value: unknown): value is Date {
		if (/^(0[1-9]|[12][0-9]|3[01])[.\-,/](0[1-9]|1[0-2])[.\-,/](\d{4})$/.test(value as any))
			return !isNaN(new Date(value as any) as unknown as number);
		else return false;
	}

	async function handleFiles(fileList: File[]) {
		isParsing = true;

		let parsedFields = false;

		let data: ResultRow[] = [];
		let columns: Column[] = [];

		let transaction = getTransaction(['files_db'], 'readwrite');
		let objStore = transaction?.objectStore('files_db');
		let query = objStore?.add({ name: fileName, data, columns });

		query?.addEventListener('success', () => {});
		transaction?.addEventListener('complete', () => {
			goto(`/editor/${fileName}`);
		});
		transaction?.addEventListener('error', () => console.error('Transaction error'));

		Paparse.parse<ResultRow, File>(fileList[0], {
			dynamicTyping: true,
			header: true,
			error(error, file) {
				parsedFields = true;
			},
			step(results, parser) {
				Object.entries(results.data).forEach(([k, value], idx) => {
					if (!Number.isInteger(value)) {
						results.data[k] = isValidDate(value) ? new Date(value) : value;
					}
				});

				data.push(results.data);

				if (!parsedFields) {
					if (!results.meta.fields) {
						parser.abort();
						return;
					}

					columns = results.meta.fields.map((field) => {
						let type: 'string' | 'number' | 'object' | 'date' = typeof results.data[field] as
							| 'string'
							| 'number'
							| 'object';

						if (type === 'object') {
							type = 'date';
						}
						return { value: field, column_type: type };
					});

					parsedFields = true;
				}
			},
			complete() {
				let fileName = fileList[0].name.substring(0, fileList[0].name.lastIndexOf('.'));
				// console.log(fileName);
				// console.log({ data, columns });

				let transaction = getTransaction(['files_db'], 'readwrite');
				let objStore = transaction?.objectStore('files_db');
				let query = objStore?.add({ name: fileName, data, columns });

				query?.addEventListener('success', () => {});
				transaction?.addEventListener('complete', () => {
					goto(`/editor/${fileName}`);
				});
				transaction?.addEventListener('error', () => console.error('Transaction error'));

				// addFile(fileName, { data, columns });

				// isParsing = false;
				// appState = State.Table;

				// goto(`/editor/${fileName}`);
			}
		});
	}
</script>

<div class="flex min-h-full min-w-full flex-col">
	<Dropzone
		{handleFiles}
		disabled={isParsing}
		acceptTypes={['application/vnd.ms-excel', 'text/csv', 'application/json']}
		class="text-foreground/80 hover:text-foreground m-auto w-[30%]"
	>
		<DownloadCloud class="h-10 w-10" />
		{#if !isParsing}
			<p>Нажмите или перенесите файл(ы)</p>
		{:else}
			<p>Подождите...</p>
		{/if}
	</Dropzone>
</div>
<!-- <Uploader {uploader} /> -->
