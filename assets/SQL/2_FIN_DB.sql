
USE JazzerLife;
-- 創建 BankAccount 表
CREATE TABLE FIN.BankAccount (
    AccountID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    IDNumber NVARCHAR(20) NOT NULL,
    OrganizationName NVARCHAR(100) NOT NULL,
    AccountName NVARCHAR(100) NOT NULL,
    Currency NVARCHAR(10) NOT NULL,
    CreditLimit DECIMAL(18, 2) DEFAULT 0,
    AccountBalance DECIMAL(18, 2) DEFAULT 0,
    AvailableCredit DECIMAL(18, 2) DEFAULT 0,
    AccountStopTime DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Mem.Users(UserID)
);

-- 創建 Bill 表
CREATE TABLE FIN.Bill (
    BillID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    OrganizationName NVARCHAR(100) NOT NULL,
    BillType NVARCHAR(50) NOT NULL,
    BillAmount DECIMAL(18, 2) NOT NULL,
    MinimumPayment DECIMAL(18, 2) NOT NULL,
    DueDate DATE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Mem.Users(UserID)
);

-- 創建 Detail 表
CREATE TABLE FIN.Detail (
    DetailID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    IDNumber NVARCHAR(20) NOT NULL,
    OrganizationName NVARCHAR(100) NOT NULL,
    AccountName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Description NVARCHAR(255) NOT NULL,
    Currency NVARCHAR(10) NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    TransactionDate DATE NOT NULL,
    PostingDate DATE NOT NULL,
    Tag NVARCHAR(50),
    Notes NVARCHAR(255),
    AccountStopTime DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Mem.Users(UserID)
);

-- 創建 Stock 表
CREATE TABLE FIN.Stock (
    StockID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    OrganizationName NVARCHAR(100) NOT NULL,
    AccountName NVARCHAR(100) NOT NULL,
    Code NVARCHAR(50) NOT NULL,
    Unit INT NOT NULL,
    MarketValue DECIMAL(18, 2) NOT NULL,
    Cost DECIMAL(18, 2) NOT NULL,
    UnRealizedBenefit DECIMAL(18, 2) NOT NULL,
    UnRealizedBenefitRatio DECIMAL(5, 2) NOT NULL,
    AccountStopTime DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Mem.Users(UserID)
);