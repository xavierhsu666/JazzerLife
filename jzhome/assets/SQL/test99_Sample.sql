USE [ME_Planning]
GO

-- 插入範例用戶資料
INSERT INTO OMT.DX_JZ_Users (UserName, Email, PasswordHash, PhoneNumber)
VALUES 
('Alice', 'alice@example.com', 'hashed_password_1', '123-456-7890'),
('Bob', 'bob@example.com', 'hashed_password_2', '234-567-8901'),
('Charlie', 'charlie@example.com', 'hashed_password_3', '345-678-9012');

-- 插入範例銀行帳戶資料
INSERT INTO OMT.DX_JZ_BankAccount (UserID, IDNumber, OrganizationName, AccountName, Currency, CreditLimit, AccountBalance, AvailableCredit)
VALUES 
(1, 'N126***819', '中華郵政', '中華郵政', 'TWD', 0, 543, 0),
(1, 'N126***819', '台新銀行', '敦南Richart', 'TWD', 0, 12509, 0);

-- 插入範例帳單資料
INSERT INTO OMT.DX_JZ_Bill (UserID, OrganizationName, BillType, BillAmount, MinimumPayment, DueDate)
VALUES 
(1, '中國信託', '信用卡', 496, 496, '2022-03-15'),
(1, '中國信託', '信用卡', 6963, 1000, '2022-04-15'),
(1, '中國信託', '信用卡', 11981, 1200, '2022-05-15');

-- 插入範例明細資料
INSERT INTO OMT.DX_JZ_Detail (UserID, IDNumber, OrganizationName, AccountName, Category, Description, Currency, Amount, TransactionDate, PostingDate)
VALUES 
(1, 'N126***819', '台新銀行', '台新證券', '投資買賣', '轉帳支取 - 劃撥轉帳元大高股息', 'TWD', -115093, '2024-10-11', '2024-10-11'),
(1, 'N126***819', '中國信託', '活期存款', '人情往來', '跨行轉 - 391 000000253**18725', 'TWD', 18000, '2024-10-11', '2024-10-11'),
(1, 'N126***819', '中國信託', '活期存款', '玩', '跨行轉 - 行動網 0000157220003765', 'TWD', -1000, '2024-10-11', '2024-10-11'),
(1, 'N126***819', '中國信託', '活期存款', '休閒娛樂', '跨行轉 - 行動網 0001344979150169', 'TWD', -4160, '2024-10-13', '2024-10-13');

-- 插入範例股票資料
INSERT INTO OMT.DX_JZ_Stock (UserID, OrganizationName, AccountName, Code, Unit, MarketValue, Cost, UnRealizedBenefit, UnRealizedBenefitRatio)
VALUES 
(1, 'MannualStock', 'TC', '878', 15000, 330750, 335236, -5098.75, -1.52),
(1, 'MannualStock', 'TC', '919', 24000, 562080, 583687, -22649.08, -3.88),
(1, 'MannualStock', 'TC', '56', 8000, 296160, 307466, -11855.16, -3.86),
(1, 'MannualStock', 'TC', '929', 30000, 541800, 564903, -24107.8, -4.27);

-- 插入範例零件分類資料
INSERT INTO OMT.DX_JZ_PartCategories (UserID, CategoryName)
VALUES 
(1, 'Engine'),
(2, 'Brakes'),
(3, 'Tires');

-- 插入範例車輛資料
INSERT INTO OMT.DX_JZ_Vehicles (UserID, Make, Model, Year, LicensePlate)
VALUES 
(1, 'Toyota', 'Corolla', 2020, 'ABC123'),
(2, 'Honda', 'Civic', 2019, 'XYZ789'),
(3, 'Ford', 'Focus', 2018, 'LMN456');

-- 插入範例燃料消耗記錄
INSERT INTO OMT.DX_JZ_FuelConsumption (VehicleID, Date, OdometerReading, FuelAmount, FuelCost)
VALUES 
(1, '2025-01-01', 15000, 40, 50),
(2, '2025-01-02', 20000, 35, 45),
(3, '2025-01-03', 25000, 50, 60);

-- 插入範例零件維護記錄
INSERT INTO OMT.DX_JZ_PartsMaintenance (VehicleID, PartName, MaintenanceDate, Cost, Notes, CategoryID, OdometerReading, Description)
VALUES 
(1, 'Brake Pads', '2025-01-10', 200, 'Replaced brake pads', 1, 15000, 'Front brake pads replacement'),
(2, 'Oil Filter', '2025-01-15', 50, 'Changed oil filter', 2, 20000, 'Routine oil filter change'),
(3, 'Tires', '2025-01-20', 400, 'Replaced all four tires', 3, 25000, 'New set of tires');

-- 插入範例維護商店聯絡資料
INSERT INTO OMT.DX_JZ_MaintenanceShops (UserID, ShopName, ContactPerson, PhoneNumber, Address)
VALUES 
(1, 'AutoFix', 'John Doe', '123-456-7890', '123 Main St, City, Country'),
(2, 'CarCare', 'Jane Smith', '234-567-8901', '456 Elm St, City, Country'),
(3, 'RepairPro', 'Mike Johnson', '345-678-9012', '789 Oak St, City, Country');

-- 插入範例維護週期資料
INSERT INTO OMT.DX_JZ_MaintenanceCycles (UserID, PartName, TimeCycle, MileageCycle)
VALUES 
(1, 'Oil Change', 180, 5000),
(2, 'Tire Rotation', 365, 10000),
(3, 'Brake Inspection', 90, 3000);