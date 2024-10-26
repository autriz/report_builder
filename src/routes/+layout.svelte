<script lang="ts">
	import Cookies from '$lib/components/Cookies.svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import '../app.css';
	import { ModeWatcher, mode, toggleMode } from 'mode-watcher';
	import { initDBState, initUserState } from '$lib/userStore.svelte';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	onMount(() => {
		let storage = sessionStorage.getItem('files');

		let db: IDBDatabase;
		const openOrCreateDB = window.indexedDB.open('files_db', 1);

		openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));

		openOrCreateDB.addEventListener('success', () => {
			console.log('Successfully opened DB');
			db = openOrCreateDB.result;

			initDBState(db);
		});

		openOrCreateDB.addEventListener('upgradeneeded', (init) => {
			db = init.target.result;
			console.log('upgrade');

			db.onerror = () => {
				console.error('Error loading database.');
			};

			const table = db.createObjectStore('files_db', { keyPath: 'id', autoIncrement: true });
			table.createIndex('name', 'title', { unique: false });
			table.createIndex('columns', 'columns', { unique: false });
			table.createIndex('data', 'data', { unique: false });

			initDBState(db);
		});

		if (!storage) {
			sessionStorage.setItem('files', JSON.stringify({}));

			initUserState({});
		} else {
			initUserState(JSON.parse(storage));
		}
	});
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
