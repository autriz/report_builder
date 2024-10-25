<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";

	let { children, data } = $props();
</script>

<ModeWatcher defaultMode="system" themeStorageKey="color-theme"  />

<div class="min-w-screen h-fit min-h-[100dvh] max-w-full bg-background text-secondary-foreground">
	<div class="relative flex flex-col min-h-screen">
		{@render children()}
	</div>
</div>