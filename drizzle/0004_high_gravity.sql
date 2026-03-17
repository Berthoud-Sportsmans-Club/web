ALTER TABLE "admins" RENAME COLUMN "username" TO "email";
ALTER TABLE "admins" RENAME CONSTRAINT "admins_username_unique" TO "admins_email_unique";
