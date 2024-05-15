/*
  Warnings:

  - Added the required column `projectId` to the `markdown` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "markdown" ADD COLUMN     "projectId" TEXT NOT NULL;
