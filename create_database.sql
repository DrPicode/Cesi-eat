CREATE TABLE Address(
   Id_Address INT,
   Adress VARCHAR(80) NOT NULL,
   Is_Deleted BOOLEAN NOT NULL,
   PRIMARY KEY(Id_Address)
);

CREATE TABLE Status(
   Id_Status INT,
   Status_Name VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_Status)
);

CREATE TABLE Login(
   Id_Login INT,
   Mail VARCHAR(80) NOT NULL,
   Password VARCHAR(50) NOT NULL,
   Is_Deleted BOOLEAN NOT NULL,
   PRIMARY KEY(Id_Login)
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

CREATE TABLE User_Account(
   Id_User INT,
   Lastname VARCHAR(55) NOT NULL,
   Firstname VARCHAR(55) NOT NULL,
   Phone VARCHAR(50) NOT NULL,
   Date_Creation DATE NOT NULL,
   Date_Deletion DATE,
   Is_Deleted BOOLEAN NOT NULL,
   Id_Login INT NOT NULL,
   Id_Status INT NOT NULL,
   PRIMARY KEY(Id_User),
   UNIQUE(Id_Login),
   FOREIGN KEY(Id_Login) REFERENCES Login(Id_Login),
   FOREIGN KEY(Id_Status) REFERENCES Status(Id_Status)
);

CREATE TABLE Restaurant(
   Id_Restaurant INT,
   Name VARCHAR(60) NOT NULL,
   Is_Deleted LOGICAL NOT NULL,
   Id_Type INT NOT NULL,
   Id_User INT NOT NULL,
   PRIMARY KEY(Id_Restaurant),
   FOREIGN KEY(Id_Type) REFERENCES Restaurant_Type(Id_Type),
   FOREIGN KEY(Id_User) REFERENCES User_Account(Id_User)
);

CREATE TABLE Deliveryman(
   Id_Deliveryman INT,
   Lastname VARCHAR(50) NOT NULL,
   Firstname VARCHAR(50) NOT NULL,
   Is_Deleted BOOLEAN NOT NULL,
   Id_Login INT NOT NULL,
   PRIMARY KEY(Id_Deliveryman),
   UNIQUE(Id_Login),
   FOREIGN KEY(Id_Login) REFERENCES Login(Id_Login)
);

CREATE TABLE Orders(
   Order_ID INT,
   Order_Date DATE NOT NULL,
   Price DECIMAL(15,2) NOT NULL,
   Delivery_Hour TIME NOT NULL,
   Delivery_Code INT NOT NULL,
   Is_Deleted BOOLEAN NOT NULL,
   Id_Address INT NOT NULL,
   Id_Order_Status INT NOT NULL,
   Id_Deliveryman INT NOT NULL,
   Id_Restaurant INT NOT NULL,
   Id_User INT NOT NULL,
   PRIMARY KEY(Order_ID),
   FOREIGN KEY(Id_Address) REFERENCES Address(Id_Address),
   FOREIGN KEY(Id_Order_Status) REFERENCES Order_Status(Id_Order_Status),
   FOREIGN KEY(Id_Deliveryman) REFERENCES Deliveryman(Id_Deliveryman),
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