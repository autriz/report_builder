import { json } from '@sveltejs/kit';
import  OrganizationService  from '../../../lib/server/service/organization';


export async function GET(){
    return await json(OrganizationService.getOrganizations());
}