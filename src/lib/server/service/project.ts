import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import { department_projects, project as project_table, type Project } from "../db/schema";

class ProjectService{
    
    async getProjectsByOrganization(organization_id:string){
        let query = `
            SELECT p.id, p.title, p.report_generation_interval, p.target_id
            FROM projects p
            JOIN departments_projects dp ON p.id = dp.project_id
            JOIN departments d ON dp.department_id = d.id
            WHERE d.organization_id = '${organization_id}';
        `
    }

}

export default new ProjectService();