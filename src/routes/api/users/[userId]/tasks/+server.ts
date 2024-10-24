export async function GET({ params, locals }) {
    if (!locals.user) {
        return new Response("No auth", { status: 401 })
    }
    return new Response(`tasks for user ${params["userId"]}`);
}