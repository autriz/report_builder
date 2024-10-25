<script lang="ts">
	import { page } from "$app/stores";

    const { user }: { user: App.Locals["user"] | null } = $props();

    let isInAuth = $derived(
		$page.url.pathname.endsWith("/sign-up") ||
		$page.url.pathname.endsWith("/login")
    )
</script>

{#if !isInAuth}
    <header class="w-full h-fit bg-card flex flex-row justify-between items-center px-4">
        <a href="/">Лого</a>
        <div class="flex flex-row items-center">
            <a class="mr-5" href="/login">Войти</a>
            <a class="text-sm bg-primary p-2 my-2 rounded-md transition-colors hover:bg-primary/90" href="/sign-up"><b>Начать работу</b></a>
        </div>
    </header>
{/if}