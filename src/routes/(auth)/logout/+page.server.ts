import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || !event.locals.session) {
		return redirect(302, '/demo/lucia/login');
	}

	await auth.invalidateSession(event.locals.session.id);
	event.cookies.delete(auth.sessionCookieName, { path: '/' });

    return redirect(302, '/');
};