<script lang="ts">
	import { enhance } from '$app/forms';
	import Table from '$lib/components/Table.svelte';
	import { createUploader } from '$lib/utils/uploadthing';
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

	let input: HTMLInputElement;

	let resultsState = $state<unknown[]>([]);
	let fields = $state<string[] | undefined>(undefined);

	function isValidDate(value: string): boolean {
		return !isNaN(new Date(value));
	}

	function doThing() {
		Paparse.parse(input.files![0], {
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

				if (!fields) fields = results.meta.fields;
			}
		});
	}
</script>

<!-- <Uploader {uploader} /> -->
<input type="file" bind:this={input} onchange={() => doThing()} max="1" />

{#if resultsState && fields}
	<Table data={resultsState} {fields} />
{/if}
