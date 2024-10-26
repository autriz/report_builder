<script lang="ts">
	import type { ResultRow } from '../../routes/(landing)/+page.svelte';
	import SettingSection from './SettingSection.svelte';
	import Table from './Table.svelte';
	import { Button } from './ui/button';
	import {removeRows} from '../utils/remove_rows';
	import { getUserState } from '$lib/userStore.svelte';

	let data = getUserState();

	let selectedDataIds: any = $state();
</script>

<div class="flex flex-row pl-3">
	<Table data={$data[0].data} fields={$data[0].columns} bind:selectedDataIds />
	<div class="h-full w-fit grow">
		<!-- <SettingSection>
			<Button variant="default" class="text-md">Add another file</Button>
		</SettingSection>
		<SettingSection>
			<Button variant="default" class="text-md">Add column</Button>
		</SettingSection>
		<SettingSection>
			<Button variant="default" class="text-md">Remove selected</Button>
		</SettingSection>
		<SettingSection>
			<Button variant="default" class="text-md">Continue</Button>
		</SettingSection> -->
		<section>
			<Button variant="default" class="text-md" disabled>Add another file</Button>
		</section>
		<section>
			<Button variant="default" class="text-md" disabled>Add column</Button>
		</section>
		<!-- <section>
			<Button variant="default" class="text-md" disabled={!$hasNextPage} onclick={removeRows()}>Unselect</Button>
		</section>
		<section>
			<Button variant="outline" class="text-md" disabled={!$hasNextPage} onclick={removeRows()} >Remove selected </Button>
		</section> -->
		<section>
			<Button variant="default" class="text-md" disabled >Continue</Button>
		</section>
	</div>
</div>
