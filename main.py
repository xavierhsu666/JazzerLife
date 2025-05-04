import pandas as pd

# 讀取Excel檔案
df = pd.read_excel('./wb.xlsx').fillna('NULL')

# 生成INSERT語句
insert_statements = []

for _, row in df.iterrows():  # 使用iterrows()以行字典方式處理
    insert_sql = f"""
    INSERT INTO CarMan.PartsMaintenance 
    (VehicleID, CategoryID, PartName, MaintenanceDate, Store, OdometerReading, Cost, Description, Notes, CreatedAt, UpdatedAt) 
    VALUES ({row['VehicleID']}, {row['CategoryID']}, '{row['PartName']}', '{row['MaintenanceDate']}', '{row['Store']}', {row['OdometerReading']}, {row['Cost']}, '{row['Description']}', '{row['Notes']}', '{row['CreatedAt']}', '{row['UpdatedAt']}');
    """
    insert_statements.append(insert_sql)

# 將所有的INSERT語句輸出
for statement in insert_statements:
    print(statement)
pd.DataFrame(insert_statements).to_excel('wb2.xlsx')