import { eq } from "drizzle-orm";
import { db } from "../db";
import { role as role_table, type Role } from "../db/schema";

// Роли для авторизации в системе (ADMIN, USER)
class RoleService{
    async getRoles() {
        // db.select().from(report).leftJoin(project).leftJoin(organization).where(eq(project.id, report.id).append(where(organization.id, project.id)))
        return await db.select().from(role_table);
    }

    async getRole(id: Role["id"]) {
        return await db.select()
            .from(role_table)
            .where(eq(role_table.id, id));
    }

}

export default new RoleService();
