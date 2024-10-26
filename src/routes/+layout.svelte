<script lang="ts">
	import Cookies from '$lib/components/Cookies.svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import '../app.css';
	import { ModeWatcher, mode, toggleMode } from 'mode-watcher';

	let { children, data } = $props();
</script>

<ModeWatcher defaultMode="system" themeStorageKey="color-theme" />

<div class="min-w-screen bg-background text-secondary-foreground h-fit min-h-[100dvh] max-w-full">
	<div class="relative flex min-h-screen flex-col">
		{@render children()}
	</div>
</div>

<div class="absolute bottom-0 right-0 mb-3 mr-3 h-fit w-fit">
	<button
		class="border-border hover:bg-muted rounded-md border p-2 transition-colors"
		onclick={toggleMode}
	>
		{#if $mode === 'light'}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</button>
</div>

<Cookies />
