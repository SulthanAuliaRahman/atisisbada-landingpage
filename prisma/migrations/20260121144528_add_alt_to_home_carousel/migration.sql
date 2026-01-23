/*
  Warnings:

  - Added the required column `alt` to the `home_carousel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "home_carousel" ADD COLUMN     "alt" VARCHAR(255) NOT NULL;
