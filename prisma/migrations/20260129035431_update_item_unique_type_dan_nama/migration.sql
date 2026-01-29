/*
  Warnings:

  - A unique constraint covering the columns `[type,nama]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "item_type_nama_key" ON "item"("type", "nama");
