import { error, json } from '@sveltejs/kit';
import  OrganizationService  from '../../../../lib/server/service/organization';

export async function GET({params, locals}) {
    if(!locals.user || !locals.session)
       error(401, {message: "Unauthorized"});

    let organization = await OrganizationService.getOrganization(params["organizationId"]);
    if(organization) {
        return json({...organization});
    }
    return new Response(`Not found organization with id: ${params["organizationId"]}`,{status: 404});
}

export async function PUT({params, locals, request}) {
    if(!locals.user || !locals.session)
    error(401, {message: "Unauthorized"});
    
    //Нужно проверить
    const organizationToUpdate = await OrganizationService.getOrganization(params["organizationId"]);
    if(organizationToUpdate){
        if(locals.user?.id != organizationToUpdate.ownerId)
        error(403, {message: "You cannot edit this organization."})
    }

    const organization_json = await request.json();

    let organization = await OrganizationService.updateOrganization(params["organizationId"], organization_json);
    if(organization) {
        return json(organization);
    }
    return new Response(`Not found organization with id: ${params["organizationId"]}`,{status: 404});
}

export async function DELETE({params, locals, request}) {
    if(!locals.user || !locals.session)
    error(401, {message: "Unauthorized"});

    //Нужно проверить
    const organizationToDelete = await OrganizationService.getOrganization(params["organizationId"])
    if(organizationToDelete){
        if(locals.user?.id != organizationToDelete.ownerId)
        error(403, {message: "You cannot delete this organization."})
    }

    let deletedOrganization = await OrganizationService.deleteOrganization(params["organizationId"]);
    if(deletedOrganization) {
        return json({...deletedOrganization});
    }
    return new Response(`Not found organization with id: ${params["organizationId"]}`,{status: 404});

}