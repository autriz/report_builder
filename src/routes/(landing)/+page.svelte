<script lang="ts">
    import { createUploader } from "$lib/utils/uploadthing";
    import { Uploader } from "@uploadthing/svelte";

    const uploader = createUploader("reportUploader", {
        onClientUploadComplete: (res) => {
            console.log(res[0]);
        },
        onUploadError: (err) => {
            console.error(err);
        }
    })
</script>

<Uploader {uploader} />