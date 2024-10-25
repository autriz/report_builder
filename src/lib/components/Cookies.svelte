<script>
    import { onMount } from 'svelte';
    let showCookieBanner = $state(false);
    
    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        showCookieBanner = false;
    }

    onMount(() => {
        const accepted = localStorage.getItem('cookiesAccepted');
        showCookieBanner = !accepted;
    });
</script>

{#if showCookieBanner}
<div class="fixed bottom-5 left-[50%] translate-x-[-50%] bg-card text-card-foreground p-4 rounded-md shadow-md flex justify-between items-center cookie-banner">
    <div>
        Мы используем файлы Cookie для работы сайта.
    </div>
    <button 
        onclick={acceptCookies}
        class="ml-4 w-fit text-base font-semibold h-10 px-5 py-2 rounded-sm bg-primary hover:bg-primary/90 cursor-pointer transition-colors">
        <p class="m-auto">
            Принять
        </p>
    </button>
</div>
{/if}

<style>
    .cookie-banner {
        animation: slide-up 0.5s ease-out;
    }
    @keyframes slide-up {
        from {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%);
            opacity: 1;
        }
    }
</style>