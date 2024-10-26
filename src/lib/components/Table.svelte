<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { TableCheckbox } from '$lib/components/ui/table';
	import Button from './ui/button/button.svelte';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { readable, writable } from 'svelte/store';
	import {
		addPagination,
		addSortBy,
		addColumnOrder,
		addHiddenColumns,
		addTableFilter,
		addSelectedRows,
		addResizedColumns
	} from 'svelte-headless-table/plugins';
	import { Inspect } from 'lucide-svelte';
	import { object } from 'zod';

	let {
		data,
		fields,
		selectedDataIds = $bindable()
	}: {
		data: any[];
		fields: string[];
		selectedDataIds: (typeof pluginStates)['select']['selectedDataIds'];
	} = $props();

	let table = createTable(writable(data), {
		page: addPagination({
			initialPageSize: 14
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		sort: addSortBy({ disableMultiSort: true }),
		select: addSelectedRows({
			initialSelectedDataIds: {}
		}),
		hide: addHiddenColumns(),
		colOrder: addColumnOrder(),
		resize: addResizedColumns()
	});

	let columnsArray = [];

	columnsArray.push(
		table.column({
			accessor: 'select',
			header: '',
			cell: ({ row }, { pluginStates }) => {
				const { isSelected, isSomeSubRowsSelected } = pluginStates.select.getRowState(row);
				return createRender(TableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				resize: { disable: true }
			}
		})
	);

	fields.map((val) => {
		columnsArray.push(
			table.column({
				accessor: val,
				plugins: {
					sort: { invert: true },
					resize: {}
				},
				header: (cell, state) => val
			})
		);
	});

	const { tableAttrs, headerRows, tableBodyAttrs, pageRows, pluginStates, flatColumns } =
		table.createViewModel(columnsArray);

	selectedDataIds = pluginStates.select.selectedDataIds;
	const { sortKeys } = pluginStates.sort;
	const { hiddenColumnIds } = pluginStates.hide;
	const { pageIndex, pageCount, pageSize, hasPreviousPage, hasNextPage } = pluginStates.page;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = $state(Object.fromEntries(ids.map((id) => [id, true])));

	$effect(() => {
		$hiddenColumnIds = Object.entries(hideForId)
			.filter(([_, hide]) => !hide)
			.map(([id, _]) => id);
	});

	
	// export function removeRows (){
	// 	$inspect(data[2]);
	// 	for (let key in $selectedDataIds) {
	// 		console.log("Key:", key);
	// 		const index = data.indexOf(data[Number(key)]);
	// 		console.log(Number(key));
	// 		console.log(index);
	// 		if (index > -1) {
	// 			data.splice(index, 1);
	// 		}
	// 		$inspect(data[2]);
	// 	}
	// }
	
	for (let key in $selectedDataIds){
		console.log("Key:", key);
	}

	console.log(Object.keys($selectedDataIds).length);
	console.log($selectedDataIds);
</script>

<pre>{JSON.stringify(
    {
      $selectedDataIds: $selectedDataIds,
    },
    null,
    2,
  )}</pre>

<div class="flex max-w-[1400px] flex-col">
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="text-muted-foreground flex-1 text-sm">
			{$pageIndex + 1} из {$pageCount} страниц.
		</div>
		<Button
			variant="outline"
			size="sm"
			onclick={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}
		>
			Предыдущий
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			onclick={() => ($pageIndex = $pageIndex + 1)}
		>
			Следующий
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			onclick={() => (console.log(Object.keys($selectedDataIds).length))}
		>
			size
		</Button>


	</div>
	<div class="overflow-y-auto rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe
						rowAttrs={headerRow.attrs()}
						let:rowAttrs
						rowProps={headerRow.props()}
						let:rowProps
					>
						{rowProps.select}
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									{props.select}
									<Table.Head {...attrs}>
										{#if !props.sort.disabled}
											<Button variant="ghost" onclick={props.sort.toggle}>
												<Render of={cell.render()} />
												{#if props.sort.order === 'asc'}
													<ChevronDown class="h-4 w-4" />
												{:else if props.sort.order === 'desc'}
													<ChevronUp class="h-4 w-4" />
												{/if}
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs rowProps={row.props()} let:rowProps>
						<!-- <tr {...rowAttrs} class:selected={rowProps.select.selected}></tr> -->
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs} class="max-h-[120px]">
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
