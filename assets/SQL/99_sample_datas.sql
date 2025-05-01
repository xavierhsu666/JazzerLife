-- 插入範例用戶資料
INSERT INTO MEM.Users
    (UserName, Email, PasswordHash, PhoneNumber)
VALUES
    ('Alice', 'alice@example.com', 'hashed_password_1', '123-456-7890'),
    ('Bob', 'bob@example.com', 'hashed_password_2', '234-567-8901'),
    ('Charlie', 'charlie@example.com', 'hashed_password_3', '345-678-9012');

-- 插入範例車輛資料
INSERT INTO CarMan.Vehicles
    (UserID, Make, Model, Year, LicensePlate)
VALUES
    (1, 'Toyota', 'Corolla', 2020, 'ABC123'),
    (2, 'Honda', 'Civic', 2019, 'XYZ789'),
    (3, 'Ford', 'Focus', 2018, 'LMN456');

-- 插入範例燃料消耗記錄
INSERT INTO CarMan.FuelConsumption
    (VehicleID, OdometerReading, FuelAmount, FuelCost, DistanceTravelled, FuelEfficiency, CreatedAt, UpdatedAt)
VALUES
    (1, 294568, 32.70, 23.22, 759, 13.05, '2023-02-15', '2023-02-15'),
    (1, 294871, 32.70, 32.57, 1065, 10.7, '2023-02-18', '2023-02-18'),
    (1, 295219, 32.60, 33.99, 1108, 7.1, '2023-02-21', '2023-02-21'),
    (1, 295461, 32.50, 23.20, 754, 11.6, '2023-02-28', '2023-02-28'),
    (1, 295731, 32.40, 24.37, 790, 11.0, '2023-03-01', '2023-03-01'),
    (1, 295998, 32.70, 38.05, 1244, 13.7, '2023-03-12', '2023-03-12'),
    (1, 296520, 31.90, 35.32, 1127, 10.6, '2023-04-02', '2023-04-02'),
    (1, 297360, 32.40, 20.99, 680, 11.9, '2023-04-03', '2023-04-03'),
    (1, 297681, 32.40, 29.69, 962, 10.8, '2023-04-09', '2023-04-09'),
    (1, 298203, 33.00, 35.28, 1164, 14.8, '2023-04-10', '2023-04-10'),
    (1, 298638, 33.00, 29.45, 972, 14.8, '2023-05-01', '2023-05-01'),
    (2, 298711, 32.40, 6.30, 204, 11.6, '2023-05-30', '2023-05-30'),
    (2, 298962, 30.00, 25.49, 765, 9.8, '2023-06-25', '2023-06-25'),
    (2, 299503, 30.60, 35.24, 1078, 15.4, '2023-07-10', '2023-07-10'),
    (2, 300163, 33.30, 37.58, 1251, 17.6, '2023-07-23', '2023-07-23'),
    (2, 300807, 34.60, 31.00, 1073, 20.8, '2023-08-18', '2023-08-18'),
    (2, 301146, 34.60, 30.63, 1060, 11.1, '2023-08-26', '2023-08-26'),
    (2, 301469, 34.60, 25.80, 893, 12.5, '2023-08-27', '2023-08-27'),
    (2, 301647, 35.10, 24.27, 852, 7.3, '2023-09-16', '2023-09-16'),
    (2, 301956, 34.90, 29.63, 1034, 10.4, '2023-09-23', '2023-09-23'),
    (2, 302261, 34.30, 27.08, 929, 11.3, '2023-10-08', '2023-10-08');

-- 插入範例零件維護記錄
INSERT INTO CarMan.PartsMaintenance
    (VehicleID, PartName, MaintenanceDate, Cost, Notes, CategoryID, OdometerReading, Description)
VALUES
    (1, 'Brake Pads', '2025-01-10', 200, 'Replaced brake pads', 1, 15000, 'Front brake pads replacement'),
    (2, 'Oil Filter', '2025-01-15', 50, 'Changed oil filter', 2, 20000, 'Routine oil filter change'),
    (3, 'Tires', '2025-01-20', 400, 'Replaced all four tires', 3, 25000, 'New set of tires');

-- 插入範例維護商店聯絡資料
INSERT INTO CarMan.MaintenanceShops
    (UserID, ShopName, ContactPerson, PhoneNumber, Address)
VALUES
    (1, 'AutoFix', 'John Doe', '123-456-7890', '123 Main St, City, Country'),
    (2, 'CarCare', 'Jane Smith', '234-567-8901', '456 Elm St, City, Country'),
    (3, 'RepairPro', 'Mike Johnson', '345-678-9012', '789 Oak St, City, Country');

-- 插入範例維護週期資料
INSERT INTO CarMan.MaintenanceCycles
    (UserID, PartName, TimeCycle, MileageCycle)
VALUES
    (1, 'Oil Change', 180, 5000),
    (2, 'Tire Rotation', 365, 10000),
    (3, 'Brake Inspection', 90, 3000);

-- 插入範例銀行帳戶資料
INSERT INTO FIN.BankAccount
    (UserID, IDNumber, OrganizationName, AccountName, Currency, CreditLimit, AccountBalance, AvailableCredit)
VALUES
    (1, 'N126***819', '中華郵政', '中華郵政', 'TWD', 0, 543, 0),
    (1, 'N126***819', '台新銀行', '敦南Richart', 'TWD', 0, 12509, 0);

-- 插入範例帳單資料
INSERT INTO FIN.Bill
    (UserID, OrganizationName, BillType, BillAmount, MinimumPayment, DueDate)
VALUES
    (1, '中國信託', '信用卡', 496, 496, '2022-03-15'),
    (1, '中國信託', '信用卡', 6963, 1000, '2022-04-15'),
    (1, '中國信託', '信用卡', 11981, 1200, '2022-05-15');

-- 插入範例明細資料
INSERT INTO FIN.Detail
    (UserID, IDNumber, OrganizationName, AccountName, Category, Description, Currency, Amount, TransactionDate, PostingDate)
VALUES
    (1, 'N126***819', '台新銀行', '台新證券', '投資買賣', '轉帳支取 - 劃撥轉帳元大高股息', 'TWD', -115093, '2024-10-11', '2024-10-11'),
    (1, 'N126***819', '中國信託', '活期存款', '人情往來', '跨行轉 - 391 000000253**18725', 'TWD', 18000, '2024-10-11', '2024-10-11'),
    (1, 'N126***819', '中國信託', '活期存款', '玩', '跨行轉 - 行動網 0000157220003765', 'TWD', -1000, '2024-10-11', '2024-10-11'),
    (1, 'N126***819', '中國信託', '活期存款', '休閒娛樂', '跨行轉 - 行動網 0001344979150169', 'TWD', -4160, '2024-10-13', '2024-10-13');

-- 插入範例股票資料
INSERT INTO FIN.Stock
    (UserID, OrganizationName, AccountName, Code, Unit, MarketValue, Cost, UnRealizedBenefit, UnRealizedBenefitRatio)
VALUES
    (1, 'MannualStock', 'TC', '878', 15000, 330750, 335236, -5098.75, -1.52),
    (1, 'MannualStock', 'TC', '919', 24000, 562080, 583687, -22649.08, -3.88),
    (1, 'MannualStock', 'TC', '56', 8000, 296160, 307466, -11855.16, -3.86),
    (1, 'MannualStock', 'TC', '929', 30000, 541800, 564903, -24107.8, -4.27);