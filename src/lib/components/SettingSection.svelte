<section {...$$restProps} class="bg-card flex flex-col-reverse md:flex-row-reverse">
	<div class="peer flex flex-1 flex-col gap-[1px]">
		<slot />
	</div>
	<div class="peer-focus-within:bg-primary p-[20px] transition-colors md:w-[250px]"></div>
</section>
