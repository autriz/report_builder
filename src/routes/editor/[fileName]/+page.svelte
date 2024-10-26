<script lang="ts">
	import { readable, writable } from 'svelte/store';
	import VirtualList from 'svelte-tiny-virtual-list';
	import type { ResultRow } from '$lib/types.js';

	let { data } = $props();
	let itemCount = readable(0);
	let { file, fileName } = data;

	// let columnWidths = data.file.columns.map((column) => {
	//     column.
	// 	return { column.value: 200 };
	// });

	let columnWidths: { [key: string]: number } = $state(
		Object.keys(file.columns).reduce((ac, a) => ({ ...ac, [a]: 200 }), {})
	);

	let start = $state(0);
	let end = $state(0);

	function getCells(row: ResultRow) {
		return Object.values(row);
	}
</script>

<div class="flex h-full w-full flex-col overflow-hidden">
	<VirtualList itemCount={file.data.length} itemSize={50} height={800} width="100%">
		<div slot="header" class="sticky flex w-fit flex-row pl-4">
			{#each file.columns as column}
				<div
					class="flex w-[200px] resize-x items-center overflow-hidden text-ellipsis"
					bind:clientWidth={columnWidths[column.value]}
				>
					<div class="mr-3 h-8 select-none pl-2">
						{column.value}
					</div>
				</div>
			{/each}
		</div>
		<div
			slot="item"
			let:index
			let:style
			{style}
			class="border-border hover:bg-muted flex flex-row border-b pl-4 transition-colors last:border-[0px]"
		>
			{#each getCells(file.data[index]) as cell, idx}
				<div
					style="width: {columnWidths[file.columns[idx].value]}px"
					class="flex items-center overflow-hidden text-ellipsis pl-2"
				>
					{cell}
				</div>
			{/each}
		</div>
	</VirtualList>
</div>
