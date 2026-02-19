import {
  date,
  integer,
  json,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().default(0),
  email: varchar({ length: 255 }).notNull().unique(),
  credit: integer().default(5),
});


export const ProjectTable = pgTable('project',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar().notNull(),
    userInput: varchar(),
    device: varchar(),
    createdOn:date().defaultNow(),
    config:json(),
    userId:varchar().references(()=>usersTable.email).notNull()
})