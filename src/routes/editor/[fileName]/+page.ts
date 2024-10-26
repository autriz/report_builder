import { getUserState } from "$lib/userStore.svelte";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    let { getFile } = getUserState();

    let file = getFile(params["fileName"]);

    if (!file) {
        redirect(302, "/editor");
    }

    return { file, fileName: params["fileName"] }
};