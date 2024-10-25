import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import { organization as organization_table, type Organization } from "../db/schema";

class OrganizationService{
    
    async getOrganizations(){
        return db.select().from(organization_table);
    }


    async getOrganization(id:string){

        const [organization] = await db.select()
            .from(organization_table)
            .where(eq(organization_table.id, id));

        return organization != null ? organization : null;

    }

    async updateOrganization(id:string, organization:Organization){

        const organizationToUpdate = await this.getOrganization(id);

        if(organizationToUpdate) {
            return db.update(organization_table)
                .set({name:organization.name, ownerId:organization.ownerId})
                .where(eq(organization_table.id, id));
        }
        return null;

    }

    async deleteOrganization(id:string){
        
        const organizationToDelete = await this.getOrganization(id);

        if(organizationToDelete) {
            return db.delete(organization_table).where(eq(organization_table.id, id));
        }
        return null;
    }
}

export default new OrganizationService();