<script module>
	export type ResultRow = { [key: string[number]]: string | number | Date };
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Dropzone from '$lib/components/Dropzone.svelte';
	import TableEditor from '$lib/components/TableEditor.svelte';
	import { createUploader } from '$lib/utils/uploadthing';
	import { DownloadCloud } from 'lucide-svelte';
	import { Uploader } from '@uploadthing/svelte';
	import Paparse from 'papaparse';

	const uploader = createUploader('reportUploader', {
		onClientUploadComplete: (res) => {
			console.log(res[0]);
		},
		onUploadError: (err) => {
			console.error(err);
		}
	});

	enum State {
		Input,
		Table,
		Report
	}

	let appState = $state(State.Input);

	let input: HTMLInputElement | undefined = $state(undefined);
	let files: File[] = $state([]);

	let resultsState: ResultRow[] = $state([]);
	let fields = $state<string[] | undefined>(undefined);
	let fieldTypes = $state<('string' | 'number' | 'date')[] | undefined>(undefined);

	let isParsing = $state(false);

	function isValidDate(value: unknown): value is Date {
		if (/^(0[1-9]|[12][0-9]|3[01])[.\-,/](0[1-9]|1[0-2])[.\-,/](\d{4})$/.test(value as any))
			return !isNaN(new Date(value as any) as unknown as number);
		else return false;
	}

	function doThing() {
		isParsing = true;
		resultsState = [];
		fields = undefined;
		fieldTypes = undefined;

		Paparse.parse<ResultRow, File>(files[0], {
			dynamicTyping: true,
			header: true,
			step(results, parser) {
				// results.data.forEach((value, idx) => {
				// 	value = isValidDate(value) ? new Date(value) : value;
				// });
				Object.entries(results.data).forEach(([k, value], idx) => {
					if (!Number.isInteger(value)) {
						results.data[k] = isValidDate(value) ? new Date(value) : value;
					}
				});

				resultsState.push(results.data);

				if (!fields) {
					fields = results.meta.fields;
					fieldTypes = fields?.map((field) => {
						let type: 'string' | 'number' | 'object' | 'date' = typeof results.data[field] as
							| 'string'
							| 'number'
							| 'object';

						if (type === 'object') {
							type = 'date';
						}
						return type;
					});
				}
			},
			complete() {
				appState = State.Table;
				isParsing = false;
			}
		});
	}

	function handleFiles(fileList: File[]) {
		files = fileList;

		doThing();
	}
</script>

<div class="flex min-h-full min-w-full flex-col">
	{#if appState === State.Table}
		{#if resultsState && fields}
			<TableEditor data={resultsState} {fields} />
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
