<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import { fade, fly } from 'svelte/transition';

	let { form }: { form: ActionData } = $props();
	
	let emailValue = $state("");
	let passwordValue = $state("");
	let ready = $state(false);

	let allowed = $derived(!!emailValue && !!passwordValue);

	onMount(() => { ready = true });
</script>

<div class="m-auto">
	{#if ready}
		<form
			transition:fly={{ y: -50, duration: 300, delay: 0 }}
			class="bg-card border-border flex w-80 flex-col items-center rounded-md border p-5"
			method="post"
			use:enhance={() => { form = null; }}
			action="?/login"
		>
			<h1 class="text-2xl">Вход</h1>
			<div class="relative mt-10">
				<input
					bind:value={emailValue}
					id="email"
					type="email"
					name="email"
					minlength="6"
					maxlength="60"
					class="focus:border-primary focus:text-secondary-foreground text-muted-foreground bg-card peer h-10 w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none"
					placeholder="Почта"
				/>
				<label
					for="email"
					class="text-secondary-foreground peer-placeholder-shown:text-muted-foreground peer-focus:text-primary/80 absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
				>
					Почта
				</label>
			</div>
			<div class="relative mt-10">
				<input
					bind:value={passwordValue}
					id="password"
					type="password"
					name="password"
					minlength="6"
					maxlength="255"
					class="focus:border-primary focus:text-secondary-foreground text-muted-foreground bg-card peer h-10 w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none"
					placeholder="Пароль"
				/>
				<label
					for="password"
					class="text-secondary-foreground peer-placeholder-shown:text-muted-foreground peer-focus:text-primary/80 absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
				>
					Пароль
				</label>
			</div>
			<p class="text-red-600">{form?.message ?? ''}</p>
			<button
				class="btn variant-filled disabled:bg-primary/60 bg-primary mt-10 rounded-md px-4 py-2 transition-colors"
				disabled={!allowed}
				type="submit"
			>
				Войти
			</button>
		</form>
		<p transition:fade={{ duration: 300 }} class="mt-10 text-center">
			Нет аккаунта? <a class="text-primary" href="/sign-up">Зарегистрироваться</a>.
		</p>
	{/if}
</div>

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-background-clip: text;
		transition: background-color 5000s ease-in-out 0s;
		box-shadow: inset 0 0 20px 20px #00000000;
	}
</style>

<!-- <h1>Login</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button formaction="?/login">Login</button>
    <a href="/sign-up">Sign up</a>
</form>
<p style="color: red">{form?.message ?? ''}</p> -->