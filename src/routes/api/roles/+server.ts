import { getRoles } from '$lib/server/service/roles';
import { json } from '@sveltejs/kit';

export async function POST() {

}

export async function GET({ request }) {
    let roles = await getRoles();

    return json(roles);
}