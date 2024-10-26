import { getUserState } from "$lib/userStore.svelte";
import { get } from "svelte/store";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    let data = getUserState();

    // if (get(data).length === 0) {
    //     redirect(302, "/");
    // }
};