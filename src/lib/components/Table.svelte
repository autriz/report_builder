<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { 
		addPagination, 
		addSortBy, 
		addColumnOrder, 
		addSelectedRows, 
	    addResizedColumns,
	} from 'svelte-headless-table/plugins';

	const { data, fields }: { data: any[]; fields: string[] } = $props();


	let table = createTable(readable(data), { 
		page: addPagination({
      		initialPageSize: 20,
    	}),
		sort: addSortBy({ disableMultiSort: true }),
		select: addSelectedRows({
    	  initialSelectedDataIds: { },
    	}),
		colOrder: addColumnOrder(),
		resize: addResizedColumns(),
	});



	let columnsArray = fields.map((val) => {
		return table.column({
			accessor: val,
			plugins: {
      			sort: { invert: true },
				resize: { disable: true },
    		},
			header: (cell, state) => val
		});
	});
	

	columnsArray.push(table.column({
	  accessor: "select",
      header: '',
      cell: ({ row }, { pluginStates }) => {
        const { isSelected, isSomeSubRowsSelected } = pluginStates.select.getRowState(row);
        return createRender(Table.SelectIndicator, {
          isSelected,
          isSomeSubRowsSelected,
        });
      },
      plugins: {
        resize: {disable: true}
      }
    }));

	const {
		tableAttrs, 
		headerRows, 
		tableBodyAttrs, 
		pageRows, 
		pluginStates,
	} = table.createViewModel(columnsArray);

	const { columnIdOrder } = pluginStates.colOrder;
	const { selectedDataIds } = pluginStates.select;
	const { pageIndex, pageCount, pageSize, hasPreviousPage, hasNextPage } = pluginStates.page;
	$columnIdOrder = ['entity_id','create_date','property_name','old_value','new_value'];



	console.log($headerRows);
</script>


<h2>Pagination</h2>
<div>
  <button on:click={() => $pageIndex--} disabled={!$hasPreviousPage}>Предыдущая страница</button>
  {$pageIndex + 1} of {$pageCount}
  <button on:click={() => $pageIndex++} disabled={!$hasNextPage}>Следующая страница</button>
</div>
<div style:margin-top="1rem">
  <label for="page-size">Размер страницы</label>
  <input id="page-size" type="number" min={1} bind:value={$pageSize} />
</div>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe 
				rowAttrs={headerRow.attrs()} let:rowAttrs
				rowProps={headerRow.props()} let:rowProps
				>
					{rowProps.select} 
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe 
								attrs={cell.attrs()} let:attrs 
								props={cell.props()} let:props
							>
								{props.select} 
								<th {...attrs} on:click={props.sort.toggle}>
									<Render of={cell.render()} />
									{#if props.sort.order === 'asc'}
								  		⬇️
									{:else if props.sort.order === 'desc'}
								  		⬆️
									{/if}
									{#if !props.resize.disabled}
										<!-- <Table.Resizer/> -->
										<div class="resizer" use:props.resize.drag ></div>
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
					<Table.Row {...rowAttrs}>
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


