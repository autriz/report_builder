import { eq } from "drizzle-orm";
import { db } from "../db";
import { role } from "../db/schema";

export async function getRoles() {
    // db.select().from(report).leftJoin(project).leftJoin(organization).where(eq(project.id, report.id).append(where(organization.id, project.id)))
    return await db.select().from(role);
}