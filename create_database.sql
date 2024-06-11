CREATE TABLE Address(
                        Id_Address INT,
                        Adress VARCHAR(80) NOT NULL,
                        Is_Deleted BOOLEAN NOT NULL,
                        PRIMARY KEY(Id_Address)
);

CREATE TABLE Deliveryman(
                            Id_Deliveryman INT,
                            Lastname VARCHAR(50) NOT NULL,
                            Firstname VARCHAR(50) NOT NULL,
                            Mail VARCHAR(80) NOT NULL,
                            Password VARCHAR(55) NOT NULL,
                            Is_Deleted BOOLEAN NOT NULL,
                            PRIMARY KEY(Id_Deliveryman)
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
                           Id_Restaurant INT,
                           Name VARCHAR(60) NOT NULL,
                           Is_Deleted BOOLEAN NOT NULL,
                           Id_Type INT NOT NULL,
                           PRIMARY KEY(Id_Restaurant),
                           FOREIGN KEY(Id_Type) REFERENCES Restaurant_Type(Id_Type)
);

CREATE TABLE Orders(
                       Order_ID INT,
                       Order_Date DATE NOT NULL,
                       Article VARCHAR(50) NOT NULL,
                       Quantity INT NOT NULL,
                       Price DECIMAL(15,2) NOT NULL,
                       Delivery_Fees DECIMAL(15,2),
                       Service_Fees DECIMAL(15,2),
                       Id_User VARCHAR(50),
                       Delivery_Hour TIME NOT NULL,
                       Delivery_Code INT NOT NULL,
                       Is_Deleted BOOLEAN NOT NULL,
                       Id_Address INT NOT NULL,
                       Id_Order_Status INT NOT NULL,
                       Id_Deliveryman INT NOT NULL,
                       Id_Restaurant INT NOT NULL,
                       PRIMARY KEY(Order_ID),
                       FOREIGN KEY(Id_Address) REFERENCES Address(Id_Address),
                       FOREIGN KEY(Id_Order_Status) REFERENCES Order_Status(Id_Order_Status),
                       FOREIGN KEY(Id_Deliveryman) REFERENCES Deliveryman(Id_Deliveryman),
                       FOREIGN KEY(Id_Restaurant) REFERENCES Restaurant(Id_Restaurant)
);

CREATE TABLE Is_At(
                      Id_Restaurant INT,
                      Id_Address INT,
                      PRIMARY KEY(Id_Restaurant, Id_Address),
                      FOREIGN KEY(Id_Restaurant) REFERENCES Restaurant(Id_Restaurant),
                      FOREIGN KEY(Id_Address) REFERENCES Address(Id_Address)
);