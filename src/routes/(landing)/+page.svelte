<script module>
	export type ResultRow = { [key: string[number]]: string | number | Date };
</script>

<script lang="ts">
	// import { enhance } from '$app/forms';
	import Dropzone from '$lib/components/Dropzone.svelte';
	import TableEditor from '$lib/components/TableEditor.svelte';
	import { DownloadCloud } from 'lucide-svelte';
	// import { createUploader } from '$lib/utils/uploadthing';
	// import { Uploader } from '@uploadthing/svelte';
	import { getUserState, type Column } from '$lib/userStore.svelte';
	import Paparse from 'papaparse';

	// const uploader = createUploader('reportUploader', {
	// 	onClientUploadComplete: (res) => {
	// 		console.log(res[0]);
	// 	},
	// 	onUploadError: (err) => {
	// 		console.error(err);
	// 	}
	// });

	enum State {
		Input,
		Table,
		Report
	}

	let data = getUserState();

	let appState = $state(State.Input);

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

		Paparse.parse<ResultRow, File>(fileList[0], {
			dynamicTyping: true,
			header: true,
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
				$data.push({ data, columns });

				isParsing = false;
				appState = State.Table;
			}
		});
	}
</script>

<div class="flex min-h-full min-w-full flex-col">
	{#if appState === State.Table}
		{#if $data.length > 0}
			<TableEditor />
		{:else}
			<p class="m-auto text-2xl">Не получилось обработать файл</p>
		{/if}
	{:else if appState === State.Report}
		<p>todo</p>
	{:else if appState === State.Input}
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
		<!-- <input type="file" autocomplete="off" bind:this={input} onchange={() => doThing()} max="1" /> -->
	{/if}
</div>
<!-- <Uploader {uploader} /> -->
