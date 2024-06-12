
CREATE TABLE User(
   Id_User INT,
   Username VARCHAR(55) NOT NULL,
   Password VARCHAR(50),
   email VARCHAR(50),
   Firstname VARCHAR(55) NOT NULL,
   Phone VARCHAR(50) NOT NULL,
   Status VARCHAR(50),
   Is_Deleted BOOLEAN  NOT NULL,
   PRIMARY KEY(Id_User)
);  

CREATE TABLE Address(
   Id_Address INT,
   Address VARCHAR(80) NOT NULL,
   Is_Deleted BOOLEAN  NOT NULL,
   PRIMARY KEY(Id_Address)
);   

CREATE TABLE Order_Status(
   Id_Order_Status INT,
   Order_Status VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_Order_Status)
);  

CREATE TABLE Restaurant_Type(
   Id_Type INT,
   Type VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_Type)
);   

CREATE TABLE Restaurant(
   Id_Restaurant INT ,
   Name VARCHAR(60) NOT NULL,
   Is_Deleted BOOLEAN  NOT NULL,
   Id_Type INT NOT NULL,
   Id_User INT NOT NULL,
   PRIMARY KEY(Id_Restaurant),
   FOREIGN KEY(Id_Type) REFERENCES Restaurant_Type(Id_Type)
   FOREIGN KEY(Id_User) REFERENCES User_Account(Id_User)
);  

CREATE TABLE Orders(
   Order_ID INT,
   Order_Date DATE NOT NULL,
   Sandwitch VARCHAR(50),
   Boisson VARCHAR(50),
   Accompagnement VARCHAR(50),
   Price DECIMAL(15,2) NOT NULL,
   Delivery_Fees DECIMAL(15,2),
   Service_Fees VARCHAR(50),
   Delivery_Hour TIME NOT NULL,
   Delivery_Code INT NOT NULL,
   Is_Deleted BOOLEAN  NOT NULL,
   Id_Address INT NOT NULL,
   Id_Order_Status INT NOT NULL,
   Id_Restaurant INT NOT NULL,
   Id_User INT NOT NULL,
   PRIMARY KEY(Order_ID),
   FOREIGN KEY(Id_Address) REFERENCES Address(Id_Address),
   FOREIGN KEY(Id_Order_Status) REFERENCES Order_Status(Id_Order_Status),
   FOREIGN KEY(Id_Restaurant) REFERENCES Restaurant(Id_Restaurant),
   FOREIGN KEY(Id_User) REFERENCES User_Account(Id_User)
); 

CREATE TABLE Lives_At(
   Id_User INT,
   Id_Address INT,
   PRIMARY KEY(Id_User, Id_Address),
   FOREIGN KEY(Id_User) REFERENCES User_Account(Id_User),
   FOREIGN KEY(Id_Address) REFERENCES Address(Id_Address)
);  

CREATE TABLE Is_At(
   Id_Restaurant INT,
   Id_Address INT,
   PRIMARY KEY(Id_Restaurant, Id_Address),
   FOREIGN KEY(Id_Restaurant) REFERENCES Restaurant(Id_Restaurant),
   FOREIGN KEY(Id_Address) REFERENCES Address(Id_Address)
);
 

CREATE TABLE delivery(
   Id_User INT,
   Order_ID INT,
   Id_Delivery INT,
   PRIMARY KEY(Id_User, Order_ID),
   FOREIGN KEY(Id_User) REFERENCES User_Account(Id_User),
   FOREIGN KEY(Order_ID) REFERENCES Orders(Order_ID)
);   
