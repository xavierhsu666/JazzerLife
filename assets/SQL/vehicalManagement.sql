CREATE DATABASE VehicleManagement;
USE VehicleManagement;

-- Table for storing user information
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(15),
    Address NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Table for storing user-defined categories for parts
CREATE TABLE PartCategories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for storing vehicle information
CREATE TABLE Vehicles (
    VehicleID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Make NVARCHAR(50) NOT NULL,
    Model NVARCHAR(50) NOT NULL,
    Year INT NOT NULL,
    LicensePlate NVARCHAR(20) NOT NULL UNIQUE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for storing fuel consumption records
CREATE TABLE FuelConsumption (
    RecordID INT PRIMARY KEY IDENTITY(1,1),
    VehicleID INT NOT NULL,
    Date DATE NOT NULL,
    OdometerReading DECIMAL(10, 2) NOT NULL,
    FuelAmount DECIMAL(10, 2) NOT NULL,
    FuelCost DECIMAL(10, 2) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
);

-- Table for storing parts maintenance records
CREATE TABLE PartsMaintenance (
    MaintenanceID INT PRIMARY KEY IDENTITY(1,1),
    VehicleID INT NOT NULL,
    PartName NVARCHAR(100) NOT NULL,
    MaintenanceDate DATE NOT NULL,
    Cost DECIMAL(10, 2) NOT NULL,
    Notes NVARCHAR(255),
    CategoryID INT,
    OdometerReading DECIMAL(10, 2),
    Description NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID),
    FOREIGN KEY (CategoryID) REFERENCES PartCategories(CategoryID)
);

-- Table for storing favorite maintenance shop contacts
CREATE TABLE MaintenanceShops (
    ShopID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ShopName NVARCHAR(100) NOT NULL,
    ContactPerson NVARCHAR(100),
    PhoneNumber NVARCHAR(15),
    Address NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for storing maintenance cycles for parts
CREATE TABLE MaintenanceCycles (
    CycleID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PartName NVARCHAR(100) NOT NULL,
    TimeCycle INT, -- Time cycle in days
    MileageCycle DECIMAL(10, 2), -- Mileage cycle in kilometers
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Insert test data into Users table
INSERT INTO Users (UserName, Email, PhoneNumber, Address) VALUES
('John Doe', 'john.doe@example.com', '1234567890', '123 Main St'),
('Jane Smith', 'jane.smith@example.com', '0987654321', '456 Elm St'),
('Alice Johnson', 'alice.johnson@example.com', '5555555555', '789 Oak St');

-- Insert test data into PartCategories table
INSERT INTO PartCategories (UserID, CategoryName) VALUES
(1, 'Engine'),
(2, 'Brakes'),
(3, 'Tires');

-- Insert test data into Vehicles table
INSERT INTO Vehicles (UserID, Make, Model, Year, LicensePlate) VALUES
(1, 'Toyota', 'Camry', 2018, 'ABC123'),
(2, 'Honda', 'Civic', 2020, 'XYZ789'),
(3, 'Ford', 'Focus', 2019, 'LMN456');

-- Insert test data into FuelConsumption table
INSERT INTO FuelConsumption (VehicleID, Date, OdometerReading, FuelAmount, FuelCost) VALUES
(1, '2023-01-01', 15000.5, 50.0, 60.0),
(2, '2023-02-01', 20000.0, 40.0, 50.0),
(3, '2023-03-01', 25000.7, 45.0, 55.0);

-- Insert test data into PartsMaintenance table
INSERT INTO PartsMaintenance (VehicleID, PartName, MaintenanceDate, Cost, Notes, CategoryID, OdometerReading, Description) VALUES
(1, 'Oil Change', '2023-01-15', 30.0, 'Changed engine oil', 1, 15000.5, 'Changed engine oil'),
(2, 'Brake Pads Replacement', '2023-02-20', 100.0, 'Replaced front brake pads', 2, 20000.0, 'Replaced front brake pads'),
(3, 'Tire Rotation', '2023-03-10', 20.0, 'Rotated all four tires', 3, 25000.7, 'Rotated all four tires');

-- Insert test data into MaintenanceShops table
INSERT INTO MaintenanceShops (UserID, ShopName, ContactPerson, PhoneNumber, Address) VALUES
(1, 'Joe''s Auto Shop', 'Joe Smith', '1112223333', '321 Maple St'),
(2, 'Quick Fix Garage', 'Mike Johnson', '4445556666', '654 Pine St'),
(3, 'Auto Care Center', 'Sarah Lee', '7778889999', '987 Cedar St');

-- Insert test data into MaintenanceCycles table
INSERT INTO MaintenanceCycles (UserID, PartName, TimeCycle, MileageCycle) VALUES
(1, 'Oil Change', 180, 5000.0), -- Every 180 days or 5000 km
(2, 'Brake Pads Replacement', 365, 20000.0), -- Every 365 days or 20000 km
(3, 'Tire Rotation', 180, 10000.0); -- Every 180 days or 10000 km