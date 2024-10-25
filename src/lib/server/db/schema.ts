import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm";

export const job_title = sqliteTable('job_titles', {
	id: text('id').primaryKey(),
	value: text('value')
		.notNull(),
	description: text('description'),
});


export const user = sqliteTable('users', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	jobTitleId: text('job_title_id')
		.references(() => job_title.id),
	isRegistered: integer({mode:"boolean"}).notNull().default(false)
});

export const session = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const role = sqliteTable('roles', {
	id: text('id').primaryKey(),
	value: text('value'),
	description: text('description'),
});

export const user_roles = sqliteTable('users_roles', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	roleId: text('role_id')
		.notNull()
		.references(() => role.id),
});

export const organization = sqliteTable('organizations', {
	id: text('id').primaryKey(),
	ownerId: text('owner_id')
		.notNull()
		.references(() => user.id),
	name: text('name')
		.notNull()
});

export const organization_job_titles = sqliteTable('organizations_job_titles',{
	id: text('id').primaryKey(),
	organizationId: text('organization_id')
		.notNull()
		.references(()=>organization.id),
	jobTitleId: text('job_title_id')
})

export const organization_invite = sqliteTable('organization_invites', {
	id: text('id').primaryKey(),
	fromOrganizationId: text('from_organization_id')
		.notNull()
		.references(() => organization.id),
	toUserId: text('to_user_id')
		.notNull()
		.references(() => user.id)
});

export const department = sqliteTable('departments', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id')
		.notNull()
		.references(()=>organization.id),
	leaderId: text('leader_id')
		.notNull()
		.references(()=>user.id),
	name: text('name').notNull()
});

//Цель
export const target = sqliteTable('targets', {
	id: text('id').primaryKey(),
	value: text('value')
		.notNull(),
	description: text('description')
})
//Подцель
export const subtarget = sqliteTable('subtargets', {
	id: text('id').primaryKey(),
	value: text('value')
		.notNull(),
	isCompleted: integer({ mode: 'boolean' })
	.notNull()
	.default(false)
})

export const project = sqliteTable('projects', {
	id: text('id').primaryKey(),
	reportGenerationInterval: integer('report_generation_interval'),
	title: text('title')
		.notNull(),
	targetId: text('target_id')
		.references(()=>target.id)
});

export const subproject = sqliteTable('subprojects', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.references(()=>project.id)
		.notNull(),
	title: text('title')
		.notNull()
});

export const status = sqliteTable('statuses', {
	id: text('id').primaryKey(),
	value: text('value')
		.notNull(),
	description: text('description')
});

export const difficulty = sqliteTable('difficulties', {
	id: text('id').primaryKey(),
	value: text('value')
		.notNull(),
	description: text('description')
});

export const priority = sqliteTable('priorities',{
	id: text('id').primaryKey(),
	value: text('value')
		.notNull(),
	description: text('description')
});

export const task = sqliteTable('tasks', {
	id: text('id').primaryKey(),
	statusId: text('status_id')
		.references(()=>status.id)
		.notNull(),
	projectId: text('project_id')
		.references(()=>project.id)
		.notNull(),
	assignedId: text('assigned_id')
		.references(()=>user.id),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	deadline: text('deadline'),
	difficultyId: text('difficulty_id')
		.notNull()
		.references(() => difficulty.id),
	priorityId: text('priority_id')
		.notNull()
		.references(() => priority.id)
});

export const subtask = sqliteTable('subtasks', {
	id: text('id').primaryKey(),
	taskId: text('task_id')
		.notNull()
		.references(() => task.id),
	name: text('name'),
	isCompleted: integer({ mode: 'boolean' })
		.notNull()
		.default(false)
})


export const department_projects = sqliteTable('departments_projects', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id),
	departmentId: text('department_id')
		.notNull()
		.references(() => department.id)
})
;
export const report = sqliteTable('reports', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const project_reports = sqliteTable('projects_reports', {
	id: text('id').primaryKey(),
	reportId: text('report_id')
		.notNull()
		.references(() => report.id),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Role = typeof role.$inferSelect;

export type Organization = typeof organization.$inferSelect;