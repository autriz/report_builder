import { json } from "@sveltejs/kit";
import UserService from "../../../../lib/server/service/user";

export async function GET({params, locals}) {
    let user = await UserService.getUser(params["userId"]);
    if(user){
        return json({...user});
    }
    return new Response(`Not found user with id: ${params["userId"]}`,{status: 404});
}