-- CreateTable
CREATE TABLE "User_" (
    "Id_User" SERIAL NOT NULL,
    "Lastname" TEXT NOT NULL,
    "Password" TEXT,
    "Email" TEXT,
    "Firstname" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Status" TEXT,
    "Is_Deleted" BOOLEAN NOT NULL,

    CONSTRAINT "User__pkey" PRIMARY KEY ("Id_User")
);

-- CreateTable
CREATE TABLE "Address" (
    "Id_Address" SERIAL NOT NULL,
    "Address" TEXT NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("Id_Address")
);

-- CreateTable
CREATE TABLE "Order_Status" (
    "Id_Order_Status" SERIAL NOT NULL,
    "Order_Status" TEXT NOT NULL,

    CONSTRAINT "Order_Status_pkey" PRIMARY KEY ("Id_Order_Status")
);

-- CreateTable
CREATE TABLE "Restaurant_Type" (
    "Id_Type" SERIAL NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "Restaurant_Type_pkey" PRIMARY KEY ("Id_Type")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "Id_Restaurant" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL,
    "Id_Type" INTEGER NOT NULL,
    "Id_User" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("Id_Restaurant")
);

-- CreateTable
CREATE TABLE "Orders" (
    "Order_ID" SERIAL NOT NULL,
    "Order_Date" TIMESTAMP(3) NOT NULL,
    "Sandwich" TEXT,
    "Drink" TEXT,
    "Side_Food" TEXT,
    "Price" DECIMAL(15,2) NOT NULL,
    "Delivery_Fees" DECIMAL(15,2),
    "Service_Fees" TEXT,
    "Delivery_Hour" TIMESTAMP(3) NOT NULL,
    "Delivery_Code" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL,
    "Id_Address" INTEGER NOT NULL,
    "Id_Order_Status" INTEGER NOT NULL,
    "Id_Restaurant" INTEGER NOT NULL,
    "Id_User" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("Order_ID")
);

-- CreateTable
CREATE TABLE "Lives_At" (
    "Id_User" INTEGER NOT NULL,
    "Id_Address" INTEGER NOT NULL,

    CONSTRAINT "Lives_At_pkey" PRIMARY KEY ("Id_User","Id_Address")
);

-- CreateTable
CREATE TABLE "Is_At" (
    "Id_Restaurant" INTEGER NOT NULL,
    "Id_Address" INTEGER NOT NULL,

    CONSTRAINT "Is_At_pkey" PRIMARY KEY ("Id_Restaurant","Id_Address")
);

-- CreateTable
CREATE TABLE "delivery" (
    "Id_User" INTEGER NOT NULL,
    "Order_ID" INTEGER NOT NULL,
    "Id_Delivery" SERIAL NOT NULL,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("Id_User","Order_ID")
);

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_Id_Type_fkey" FOREIGN KEY ("Id_Type") REFERENCES "Restaurant_Type"("Id_Type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_Id_User_fkey" FOREIGN KEY ("Id_User") REFERENCES "User_"("Id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_Id_Address_fkey" FOREIGN KEY ("Id_Address") REFERENCES "Address"("Id_Address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_Id_Order_Status_fkey" FOREIGN KEY ("Id_Order_Status") REFERENCES "Order_Status"("Id_Order_Status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_Id_Restaurant_fkey" FOREIGN KEY ("Id_Restaurant") REFERENCES "Restaurant"("Id_Restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_Id_User_fkey" FOREIGN KEY ("Id_User") REFERENCES "User_"("Id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lives_At" ADD CONSTRAINT "Lives_At_Id_User_fkey" FOREIGN KEY ("Id_User") REFERENCES "User_"("Id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lives_At" ADD CONSTRAINT "Lives_At_Id_Address_fkey" FOREIGN KEY ("Id_Address") REFERENCES "Address"("Id_Address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Is_At" ADD CONSTRAINT "Is_At_Id_Restaurant_fkey" FOREIGN KEY ("Id_Restaurant") REFERENCES "Restaurant"("Id_Restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Is_At" ADD CONSTRAINT "Is_At_Id_Address_fkey" FOREIGN KEY ("Id_Address") REFERENCES "Address"("Id_Address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_Id_User_fkey" FOREIGN KEY ("Id_User") REFERENCES "User_"("Id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_Order_ID_fkey" FOREIGN KEY ("Order_ID") REFERENCES "Orders"("Order_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
