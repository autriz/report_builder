import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import { user as user_table, type User } from "../db/schema";

class UserService{
    async getUsers() {
        return await db.select()
            .from(user_table);
    }

    async getUser(id: User["id"]){

        const {passwordHash, ...otherFields} = getTableColumns(user_table);

        const [user] = await db.select(otherFields)
            .from(user_table)
            .where(eq(user_table.id, id));

        return user != null ? user : null;
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
