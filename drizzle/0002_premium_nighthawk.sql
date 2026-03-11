ALTER TABLE "admins" ALTER COLUMN "must_change_password" SET DEFAULT false;
UPDATE "admins" SET "must_change_password" = false;