USE [ME_Planning]
GO


-- Table for storing user-defined categories for parts
CREATE TABLE OMT.DX_JZ_PartCategories
(
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [OMT].[DX_JZ_Users](UserID)
);

-- Table for storing vehicle information
CREATE TABLE OMT.DX_JZ_Vehicles
(
    VehicleID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Make NVARCHAR(50) NOT NULL,
    Model NVARCHAR(50) NOT NULL,
    Year INT NOT NULL,
    LicensePlate NVARCHAR(20) NOT NULL UNIQUE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [OMT].[DX_JZ_Users](UserID)
);

-- Table for storing fuel consumption records
CREATE TABLE OMT.DX_JZ_FuelConsumption
(
    RecordID INT PRIMARY KEY IDENTITY(1,1),
    VehicleID INT NOT NULL,
    Date DATE NOT NULL,
    OdometerReading DECIMAL(10, 2) NOT NULL,
    FuelAmount DECIMAL(10, 2) NOT NULL,
    FuelCost DECIMAL(10, 2) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (VehicleID) REFERENCES OMT.DX_JZ_Vehicles(VehicleID)
);

-- Table for storing parts maintenance records
CREATE TABLE OMT.DX_JZ_PartsMaintenance
(
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
    FOREIGN KEY (VehicleID) REFERENCES OMT.DX_JZ_Vehicles(VehicleID),
    FOREIGN KEY (CategoryID) REFERENCES OMT.DX_JZ_PartCategories(CategoryID)
);

-- Table for storing favorite maintenance shop contacts
CREATE TABLE OMT.DX_JZ_MaintenanceShops
(
    ShopID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ShopName NVARCHAR(100) NOT NULL,
    ContactPerson NVARCHAR(100),
    PhoneNumber NVARCHAR(15),
    Address NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [OMT].[DX_JZ_Users](UserID)
);

-- Table for storing maintenance cycles for parts
CREATE TABLE OMT.DX_JZ_MaintenanceCycles
(
    CycleID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PartName NVARCHAR(100) NOT NULL,
    TimeCycle INT,
    -- Time cycle in days
    MileageCycle DECIMAL(10, 2),
    -- Mileage cycle in kilometers
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [OMT].[DX_JZ_Users](UserID)
);


