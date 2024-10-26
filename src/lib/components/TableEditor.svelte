<script lang="ts">
	import type { ResultRow } from '../../routes/(landing)/+page.svelte';
	import SettingSection from './SettingSection.svelte';
	import Table from './Table.svelte';
	import { Button } from './ui/button';

	const { data, fields }: { data: ResultRow[]; fields: string[] } = $props();

	let selectedDataIds: any = $state();
</script>

<div class="flex flex-row pl-3">
	<Table {data} {fields} bind:selectedDataIds />
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
		<section>
			<Button variant="default" class="text-md" disabled>Remove selected</Button>
		</section>
		<section>
			<Button variant="default" class="text-md" disabled>Continue</Button>
		</section>
	</div>
</div>
