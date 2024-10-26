<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils.js";
    
    export let isSelected 
    export let isSomeSubRowsSelected
</script>
  
<input type="checkbox" bind:checked={$isSelected} indeterminate={$isSomeSubRowsSelected} />