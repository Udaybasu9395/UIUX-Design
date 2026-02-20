import {
  date,
  integer,
  json,
  pgTable,
  text,
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
    projectName: varchar(),
    theme: varchar(),
    userInput: varchar(),
    device: varchar(),
    createdOn:date().defaultNow(),
    config:json(),
    projectVisualDiscription:text(),
    userId:varchar().references(()=>usersTable.email).notNull()
})

export  const ScreenConfigTable = pgTable('screenConfig',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId:varchar().references(()=> ProjectTable.projectId),
  screenId:varchar(),
  screenName:varchar(),
  purpose:varchar(),
  ScreenDescription:varchar(),
  code:text(),
})