<script>
	import SettingSection from './SettingSection.svelte';
	import Table from './Table.svelte';
	import { Button } from './ui/button';

	const { data, fields } = $props();
</script>

<div class="flex flex-row pl-3">
	<Table {data} {fields} />
	<div class="h-full w-fit grow">
		<SettingSection>
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
		</SettingSection>
	</div>
</div>
