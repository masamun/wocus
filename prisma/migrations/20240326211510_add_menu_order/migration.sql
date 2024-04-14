-- CreateTable
CREATE TABLE "menu_order" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "order" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_order_menuId_key" ON "menu_order"("menuId");

-- AddForeignKey
ALTER TABLE "menu_order" ADD CONSTRAINT "menu_order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
