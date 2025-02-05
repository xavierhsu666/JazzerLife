import pandas as pd
import copy


def map_institution(row):
    if row['金融機構/手動新增'] == '中華郵政' and row['機構名稱'] == '中華郵政':
        return '郵局'
    else:
        return ''


datalist = [
    "./input/Moneybook_台股證券手動新增庫存.csv",
    "./input/Moneybook_帳單.csv",
    "./input/Moneybook_帳戶.csv",
    "./input/Moneybook_明細.csv",
]

dataset = []
for i in range(len(datalist)):
    dataset.append(pd.DataFrame(pd.read_csv(datalist[i]).fillna("")))
dataset.append(dataset[2])
dataset[4] = pd.DataFrame(dataset[4].iloc[:, 0:4])
dataset[4].drop("身分證字號", axis=1, inplace=True)
dataset[4].drop_duplicates(inplace=True)
dataset[4].reset_index()
dataset[4].apply(map_institution)


# pd.DataFrame().drop()


if __name__ != "main":
    print((dataset[4]))
