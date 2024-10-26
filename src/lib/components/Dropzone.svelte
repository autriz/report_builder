<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface DropzoneProps {
		handleFiles: (files: File[]) => void;
		defaultClass?: HTMLInputAttributes['class'];
		acceptTypes?: string[];
	}

	type $$Props = DropzoneProps & HTMLInputAttributes;

	export let handleFiles: $$Props['handleFiles'] = () => {
		/* noop */
	};
	export let defaultClass: $$Props['defaultClass'] =
		'flex flex-col justify-center items-center w-full h-64 bg-muted/80 \
        rounded-lg border-2 border-border border-dashed cursor-pointer \
        hover:bg-card transition-colors data-[droppable=true]:bg-card';
	export let acceptTypes: $$Props['acceptTypes'] = undefined;

	let input: HTMLInputElement;
	let dropzone: HTMLButtonElement;

	let droppable = false;

	function onClick(event: MouseEvent) {
		event.preventDefault();
		input.click();
	}

	function getAcceptedFiles(files: FileList | File[] = []): File[] {
		let acceptedFiles = [];

		for (let i = 0; i < files.length; i++) {
			if (acceptTypes === undefined || isAccepted(files[i])) {
				acceptedFiles.push(files[i]);
			}
		}
		return acceptedFiles;
	}

	function isAccepted(item: DataTransferItem | File): boolean {
		if (acceptTypes === undefined) {
			return true;
		}

		return acceptTypes.includes(item.type);
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		const items = Array.from(e.dataTransfer?.items || []);

		for (const item of items) {
			if (item.kind === 'file' && isAccepted(item)) {
				droppable = true;
				return;
			}
		}

		if (!droppable && e.dataTransfer) {
			e.dataTransfer.dropEffect = 'none';
		}
	}

	function onDragLeave(e: DragEvent) {
		droppable = false;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();

		const acceptedFiles = getAcceptedFiles(e.dataTransfer?.files);

		if (acceptedFiles.length > 0) {
			handleFiles(acceptedFiles);
		}

		droppable = false;
	}

	let inputFiles: FileList;
	function handleChange(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		e.preventDefault();

		const acceptedFiles = getAcceptedFiles(inputFiles);

		if (acceptedFiles && acceptedFiles.length > 0) {
			handleFiles(acceptedFiles);
		}
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			input.click();
		}
	}
</script>

<button
	bind:this={dropzone}
	class={twMerge(defaultClass, $$props.class)}
	on:keydown={keydown}
	on:click={onClick}
	on:focus
	on:blur
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:dragenter={onDragOver}
	on:dragleave={onDragLeave}
	on:dragover={onDragOver}
	on:drop={onDrop}
	data-droppable={droppable}
	type="button"
>
	<slot />
</button>
<label class="hidden">
	<input
		{...$$restProps}
		bind:files={inputFiles}
		bind:this={input}
		on:change={handleChange}
		type="file"
		accept={acceptTypes?.join(', ')}
	/>
</label>

<style>
	button {
		cursor: pointer;
	}
	[disabled] {
		cursor: default;
	}
</style>
