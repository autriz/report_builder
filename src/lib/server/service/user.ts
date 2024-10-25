import { eq } from "drizzle-orm";
import { db } from "../db";
import { user as user_table, type User } from "../db/schema";
import { z } from "zod";

class UserService{
    async getUsers() {
        return await db.select()
            .from(user_table);
    }

    async getUser(id: User["id"]){
        return await db.select()
            .from(user_table)
            .where(eq(user_table.id, id));
    }

    async putUser(user: User){
        // Сделать валидацию
        return await db.update(user_table)
            .set({ ...user })
            .where(eq(user_table.id, user.id));
    }

    async deleteUser(id: User["id"]){
        return await db.delete(user_table)
            .where(eq(user_table.id, id));
    }
}

export default new UserService();
