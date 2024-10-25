import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { z } from "zod";

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const role = sqliteTable('role', {
	id: text('id').primaryKey(),
	value: text('value'),
	description: text('description'),
});

export const user_roles = sqliteTable('user_roles', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id),
	role_id: text('role_id')
		.notNull()
		.references(() => role.id),
})

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Role = typeof role.$inferSelect;