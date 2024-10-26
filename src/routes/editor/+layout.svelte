<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getUserState } from '$lib/userStore.svelte';
	import { PlusCircle, Trash2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const { getFileNames } = getUserState();

	let fileNames = getFileNames();

	console.log(fileNames);

	const { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-row">
	<aside class="bg-primary/40 w-fit min-w-[160px]">
		<div class="mb-3 flex justify-between pl-3">
			<p class="text-xl"><b>Data</b></p>
			<div class="flex flex-col pl-4">
				<button
					class="hover:bg-muted/60 h-9 w-9 rounded-md transition-colors"
					onclick={() => goto('/')}
				>
					<PlusCircle class="m-auto h-5 w-5" />
				</button>
			</div>
		</div>
		<section>
			{#each fileNames as fileName}
				<div
					data-selected={$page.params['fileName'] === fileName}
					class="data-[selected=true]:bg-primary/60 flex h-9 flex-row items-center justify-between pl-3"
				>
					<a href="/editor/{fileName}">{fileName}</a>
					<button class="hover:bg-muted/60 h-9 w-9 rounded-md transition-colors">
						<Trash2 class="m-auto h-5 w-5" />
					</button>
				</div>
			{/each}
		</section>
	</aside>
	{#if children}
		{@render children()}
	{:else}
		<p>Select file</p>
	{/if}
</div>
