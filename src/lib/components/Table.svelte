<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { TableCheckbox } from '$lib/components/ui/table';
	import Button from './ui/button/button.svelte';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { readable } from 'svelte/store';
	import {
		addPagination,
		addSortBy,
		addColumnOrder,
		addTableFilter,
		addSelectedRows,
		addResizedColumns
	} from 'svelte-headless-table/plugins';

	const { data, fields }: { data: any[]; fields: string[] } = $props();

	let table = createTable(readable(data), {
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
					resize: { disable: true }
				},
				header: (cell, state) => val
			})
		);
	});

	const { tableAttrs, headerRows, tableBodyAttrs, pageRows, pluginStates } =
		table.createViewModel(columnsArray);

	const { selectedDataIds } = pluginStates.select;
	const { pageIndex, pageCount, pageSize, hasPreviousPage, hasNextPage } = pluginStates.page;

	console.log($headerRows);
</script>

<div class="flex max-w-[900px] flex-col">
	<div class="rounded-md border">
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
									<th {...attrs} on:click={props.sort.toggle}>
										<Render of={cell.render()} />
										{#if props.sort.order === 'asc'}
											<ChevronDown class="h-4 w-4" />
										{:else if props.sort.order === 'desc'}
											<ChevronUp class="h-4 w-4" />
										{/if}
										{#if !props.resize.disabled}
											<!-- <Table.Resizer/> -->
											<div class="resizer" use:props.resize.drag></div>
										{/if}
									</th>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs rowProps={row.props()} let:rowProps>
						<tr {...rowAttrs} class:selected={rowProps.select.selected}></tr>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
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

	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="text-muted-foreground flex-1 text-sm">
			{$pageIndex + 1} of {$pageCount} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			onclick={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			onclick={() => ($pageIndex = $pageIndex + 1)}
		>
			Next
		</Button>
	</div>
</div>
