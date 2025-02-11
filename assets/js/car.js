// ! -- Global Area --------------------------------------------------------------------------
var OilData, MaintainCycleTable, vehicalsTable;
document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggleEl) => {
  dropdownToggleEl.addEventListener("click", function () {
    if ($(".dropdown-menu").hasClass("show")) {
      $(".dropdown-menu").removeClass("show");
    } else {
      $(".dropdown-menu").addClass("show");
    }
  });
});
document.querySelectorAll(".dropdown-item").forEach((dropdownToggleEl) => {
  dropdownToggleEl.addEventListener("click", function () {
    $("#btnText").prop("text", dropdownToggleEl.innerHTML);
    $(".dropdownMenuButton").attr("aria-expanded", "false");
    $(".dropdown-menu").removeClass("show");
  });
});

// ! -- Function Area ----------------------------------------------------------------------
function checkSignInStatus() {
  acc = sessionStorage.getItem("account");
  pwd = sessionStorage.getItem("password");

  $("#navSign").children().remove();

  if (acc != null && pwd != null) {
    $("#navSign").prop("text", "LogOut");
    $("#navSign").on("click", function () {
      sessionStorage.clear();
      window.location.reload();
    });
  } else {
    $("#navSign").prop("href", "signin.html#finance");
    $("#navSign").prop("text", "Sign");
    alert("請先登入");
    window.location.assign("./signin.html#car");
  }
}

/* globals Chart:false, feather:false */
function getAverageFuelEfficiency(data, dimension) {
  const groupedData = {};

  data.forEach((record) => {
    const date = new Date(record.UpdatedAt);
    let key;

    if (dimension === "daily") {
      key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    } else if (dimension === "weekly") {
      const startOfWeek = new Date(
        date.setDate(date.getDate() - date.getDay())
      );
      key = startOfWeek.toISOString().split("T")[0]; // YYYY-MM-DD
    } else if (dimension === "monthly") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`; // YYYY-MM
    }

    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(record.FuelEfficiency);
  });

  const averages = Object.keys(groupedData).map((key) => {
    const efficiencies = groupedData[key];
    const average =
      efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length;
    return { key, average };
  });

  averages.sort((a, b) => new Date(b.key) - new Date(a.key)); // 按日期排序
  return averages.slice(0, 7); // 返回最後七筆資料
}
function ChartMaker() {
  "use strict";
  var dime = $("#btnText").text().toLowerCase() + "ly";
  const AvgFE = getAverageFuelEfficiency(OilData, dime);
  // console.log(AvgFE);
  var data = AvgFE.map((obj) => obj.average);
  const formattedDates = AvgFE.map((dateString) => {
    const date = new Date(dateString.key);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  });

  // console.log(formattedDates);
  // var header = Object.keys(data[0]);
  var wdict = {
    index: [1, 2, 3, 4, 5, 6, 7],
    detail: data,
    title: ["食", "衣", "住", "行", "育樂", "育樂", "育樂"],
    time: formattedDates,
  };
  feather.replace();

  // Graphs
  $("#chart_area").empty();
  var canvas = document.createElement("canvas");
  $(canvas).html(
    "<canvas class='my-4 w-100' id='myChart' width='900' height='380'></canvas>"
  );
  $("#chart_area").append($(canvas));
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: wdict.time,
      datasets: [
        {
          data: wdict.detail,
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderWidth: 4,
          pointBackgroundColor: "#007bff",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
}
function swipeMainSection(ele) {
  $(".nav-link").removeClass("active");
  $(ele).addClass("active");
  var ActiveSection = String($(ele).children("text").html())
    .replaceAll(" ", "")
    .toUpperCase();
  $("section").each(function (i, val) {
    if ($(val).prop("id").trim().toUpperCase() == ActiveSection) {
      $(val).removeClass("d-none");
    } else {
      $(val).addClass("d-none");
    }
  });
  $("#navbar-toggler").click();
}
function toggle_MainSection(ActiveSection) {
  $("section").each(function (i, val) {
    if ($(val).prop("id").trim().toUpperCase() == ActiveSection.toUpperCase()) {
      $(val).removeClass("d-none");
    } else {
      $(val).addClass("d-none");
    }
  });
}
function data_preProcess(data) {
  var colRemain = -1;
  var row = 5;
  colRemain = colRemain == -1 ? data.length : colRemain;
  row = row == -1 ? data[0].length : row;
  var new_data = [];
  var new_data_heads = [];
  for (var i in data) {
    var item = [];
    for (var j in data[0]) {
      if (i > 0 && i <= colRemain && j <= row) {
        item.push(data[i][j]);
      } else if (i == 0 && j <= row) {
        new_data_heads.push(data[i][j]);
      }
    }
    new_data.push(item);
    // console.log(new_data_heads);
  }
  // console.log(new_data);
  new_data.splice(0, 1);
  return [new_data_heads, new_data];
}
function dataToDict(data) {
  var item = [];
  var items = [];
  var rowNum = data.length;
  var colNum = Object.keys(data[0]).length;
  dataa = data_preProcess(data);
  return dataa;
}
function DictToJexcel(data, tableID) {
  var val = data.map((obj) => Object.values(obj));
  var header = Object.keys(data[0]);

  // 計算每個欄位的最大寬度
  var colWidths = header.map((col, index) => {
    var maxLength = Math.max(
      ...val.map((row) => row[index].toString().length),
      col.length
    );
    return maxLength * 12; // 假設每個字符寬度為10像素
  });

  // 動態生成 columns 配置
  var columns = header.map((col, index) => ({
    type: "text",
    width: colWidths[index],
  }));

  jexcel(document.getElementById(tableID), {
    data: val,
    colHeaders: header,
    columns: columns,
  });

  // 隱藏行索引
  $(".jexcel_selectall, .jexcel_row").hide();
}
function getByID(url, tableid) {
  $.get(url, function (data) {
    var d = data["values"];
    var dictdata = dataToDict(d);
    DictToJexcel(dictdata, tableid);
  })
    .done(function () {
      console.log("GET OK.");
    })
    .fail(function () {
      console.log("GET Failed.");
    });
}
function gsht_getData() {
  url = [
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/工作表2:B1:F3?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/工作表1?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/車用開銷?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/需更換?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
  ];
  getByID(url[1], "c_table");
}
function jsonToDict(data) {
  var DictData = JSON.parse(data);
  return DictData;
}
function sel_gsht(sht, rng = "") {
  return new Promise((resolve, reject) => {
    // sht in ['工作表1','工作表2','車用開銷','需更換']
    var head =
      "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/";
    var range = rng ? "!" + rng : "";
    var body = sht + range;
    var footer = "?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M";
    var url = head + body + footer;

    $.get(url)
      .done(function (data) {
        console.log("GET OK.");
        resolve(data);
      })
      .fail(function () {
        console.log("GET Failed.");
        reject(new Error("GET Failed."));
      });
  });
}
function create_MaintainCycleTable() {
  var m_Table = $("#parts_table");
  m_Table.children("tbody").children("tr").remove();
  MaintainCycleTable.forEach(function (i, val) {
    var tr = document.createElement("tr");
    $(tr).html(
      "<td>" +
        i.PartName +
        "</td>" +
        "<td>" +
        i.TimeCycle +
        "</td>" +
        "<td>" +
        i.MileageCycle +
        "</td>" +
        "<td>" +
        "<input type='text' id='avgCost_" +
        val +
        "' class='input-group form-control' style='text-align: center;' readonly/>" +
        "</td>" +
        "<td>" +
        "<input type='button' id='PartsItem_" +
        i.CycleID +
        "' class='btn btn-primary' style='text-align: center;' value='EDIT' id='PartsEditBtn_" +
        i.CycleID +
        "'onclick='edit_PartsItem(this)' />" +
        "</td>"
    );
    m_Table.append(tr);
  });
}

function edit_PartsItem(ele) {
  var oldCid = $("#editParts_CID").val();
  var newCid = $(ele).prop("id").split("_")[1];
  console.log(newCid);
  if (oldCid == newCid) {
    show_toggleEle("partsEdit_table");
  } else {
    console.log(MaintainCycleTable);
    var cycle = MaintainCycleTable.find((item) => item.CycleID == newCid);
    console.log(cycle);
    $("#editParts_CID").val(cycle.CycleID);
    $("#editParts_KM").val(cycle.MileageCycle);
    $("#editParts_Day").val(cycle.TimeCycle);
    $("#partsEdit_table").removeClass("d-none");
  }
}
function create_FuelRecordTable() {
  var vc_html = $("#vehiclesSelect");
  $("#c_table").children().remove();
  if (vc_html.children().length == 0) {
    // todo -- 表示目前該使用者無任何車輛
  } else {
    // todo -- get OIL_CON
    var vid = vc_html.val().split("_")[0].split("#")[1];
    var sql_c = "select * from " + car_OilCon_DBName + " with(nolock) ";
    sql_c += "where [VehicleID] = '" + vid + "' ";
    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para).then(
      function (data) {
        // console.log(data);
        if (data.length != 0) {
          DictToJexcel(data, "c_table");
          OilData = data;
          ChartMaker();
        } else {
          OilData = "";
        }

        $("#oilPrice").val("");
        $("#oilKM_Record").val("");
        $("#oilLiter_Record").val("");
      }
    );
  }
}
function create_VehiclesTable() {
  vehicalsTable.forEach(function (i, val) {
    // todo 建立vehicles的清單
    var tr = document.createElement("tr");
    $(tr).html(
      "<th scope='row'>" +
        val +
        "</th>" +
        "<td id='vMake_" +
        i.VehicleID +
        "'>" +
        i.Make +
        "</td>" +
        "<td id='vModel_" +
        i.VehicleID +
        "'>" +
        i.Model +
        "</td>" +
        "<td id='vYear_" +
        i.VehicleID +
        "'>" +
        i.Year +
        "</td>" +
        "<td id='vLicensePlate_" +
        i.VehicleID +
        "'>" +
        i.LicensePlate +
        "</td>" +
        "<td>" +
        "<button id='vid_" +
        i.VehicleID +
        "' class='btn btn-primary' onclick='edit_Vehicles(this)'>EDIT</button>" +
        "</td>"
    );
    $("#vehiclesTable>tbody").append($(tr));
  });
}

function create_VehiclesSelectOption() {
  vehicalsTable.forEach(function (i, val) {
    // console.log(i);
    // todo 建立上方select的清單
    var option = document.createElement("option");
    $(option).html("#" + i.VehicleID + "_" + i.Model);
    if (val == 0) {
      $(option).prop("selected", true);
    }
    $("#vehiclesSelect").append(option);
  });
}
function dropdown_oilRecord(ele, id) {
  if ($("#" + id).hasClass("d-none")) {
    $(ele).val("—");
  } else {
    $(ele).val("＋");
  }
  show_toggleEle(id);
}
function show_toggleEle(id) {
  if ($("#" + id).hasClass("d-none")) {
    $("#" + id).removeClass("d-none");
  } else {
    $("#" + id).addClass("d-none");
  }
}
function loadOilPrice() {
  type = $("#OILSelect").val();
  var OdometerReading =
    OilData.length == 0 ? 0 : OilData[OilData.length - 1].OdometerReading;
  var FuelAmount =
    OilData.length == 0 ? 0 : OilData[OilData.length - 1].FuelAmount;
  sel_gsht("工作表1", "K1:N2")
    .then((data) => {
      const price = getOilPrice(data, type);
      $("#oilPrice").val(price);
      $("#oilKM_Record").val(OdometerReading);
      $("#oilLiter_Record").val(FuelAmount);
      // console.log(OilData);
      // console.log(`The price for Oil ${type} is: ${price}`);
    })
    .catch((error) => {
      console.error(error);
    });
}
function getOilPrice(data, type) {
  const headers = data.values[0];
  const prices = data.values[1];

  const index = headers.findIndex((header) => header.includes(type));
  if (index !== -1) {
    return prices[index];
  } else {
    return "Type not found";
  }
}
function submitOilRecord() {
  var lastRecord =
    OilData.length == 0 ? 0 : OilData[OilData.length - 1].OdometerReading;
  var vid = $("#vehiclesSelect").val().split("_")[0].split("#")[1];
  var oilPrice = $("#oilPrice").val();
  var oilKM_Record = $("#oilKM_Record").val();
  var oilLiter_Record = $("#oilLiter_Record").val();
  var DistanceTravelled = oilKM_Record - lastRecord;
  var FuelEfficiency = Math.round(DistanceTravelled / oilLiter_Record, 2);
  var sql_c =
    "INSERT INTO " +
    car_OilCon_DBName +
    " (VehicleID, OdometerReading, FuelAmount, FuelCost, DistanceTravelled, FuelEfficiency )";
  sql_c +=
    "VALUES ('" +
    vid +
    "', '" +
    oilKM_Record +
    "', '" +
    oilLiter_Record +
    "', '" +
    oilPrice +
    "', '" +
    DistanceTravelled +
    "', '" +
    FuelEfficiency +
    "')";
  console.log(sql_c);
  var _para = { sql_code: sql_c };
  getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
    .then(function (data) {
      console.log("上傳成功");
      reload_toDash();
    })
    .catch(function (error) {
      alert("上傳失敗，請洽系統管理員");
      reload_toDash();
    });
}
function edit_Vehicles(ele) {
  var oldVid = $("#edit_vID").val();
  var newVid = $(ele).prop("id").split("_")[1];
  if (oldVid == newVid) {
    show_toggleEle("Vehicle_edit_area");
  } else {
    $("#edit_vID").val(newVid);
    $("#edit_vMake").val($("#vMake_" + newVid).html());
    $("#edit_vModel").val($("#vModel_" + newVid).html());
    $("#edit_vYear").val($("#vYear_" + newVid).html());
    $("#edit_vPlate").val($("#vLicensePlate_" + newVid).html());
    $("#Vehicle_edit_area").removeClass("d-none");
  }
  console.log($(ele).prop("id"));
}
function upd_Vehicle() {
  var vid = $("#edit_vID").val();
  if (vid == "") {
    var sql_c =
      "INSERT INTO " +
      car_Vehicles_DBName +
      " (UserID, Make, Model, Year, LicensePlate)";
    sql_c +=
      "VALUES (" +
      sessionStorage.getItem("uid") +
      ", '" +
      $("#edit_vMake").val() +
      "', '" +
      $("#edit_vModel").val() +
      "', " +
      $("#edit_vYear").val() +
      ", '" +
      $("#edit_vPlate").val() +
      "')";
    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
      .then(function (data) {
        console.log("更新成功");
        reload_toDash();
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        reload_toDash();
      });
  } else {
    var sql_c =
      "UPDATE " +
      car_Vehicles_DBName +
      " SET[Make]='" +
      $("#edit_vMake").val() +
      "', [Model]='" +
      $("#edit_vModel").val() +
      "', [Year]=" +
      $("#edit_vYear").val() +
      ", [LicensePlate]='" +
      $("#edit_vPlate").val() +
      "' where VehicleID=" +
      vid +
      "";
    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
      .then(function (data) {
        console.log("更新成功");
        reload_toDash();
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        reload_toDash();
      });
  }
}
function del_Vehicle() {
  var vid = $("#edit_vID").val();
  if (vid == "") {
  } else {
    var sql_c = "delete " + car_Vehicles_DBName + "where VehicleID=" + vid + "";
    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
      .then(function (data) {
        console.log("刪除成功");
        reload_toDash();
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        reload_toDash();
      });
  }
}
function add_Vihecle() {
  show_toggleEle("Vehicle_edit_area");
}
function addRow_PartsTable() {
  var tr = document.createElement("tr");
  var index = $("#parts_table").children("tbody").children("tr").length + 1;
  $(tr).html(
    "<td>" +
      "<input type='text' id='parts_SortItem_" +
      index +
      "' value='' class='input-group form-control newPartsCycleItem newPartsCycleItem_" +
      index +
      "'style='text-align: center'/>" +
      "</td>" +
      "<td>" +
      "<input type='text' id='parts_KM_" +
      index +
      "' value='' class='input-group form-control newPartsCycleItem newPartsCycleItem_" +
      index +
      "'style='text-align: center'/>" +
      "</td>" +
      "<td>" +
      "<input type='text' id='parts_Day_" +
      index +
      "' value='' class='input-group form-control newPartsCycleItem newPartsCycleItem_" +
      index +
      "'style='text-align: center'/>" +
      "</td>" +
      "<td>" +
      "<input type='text' id='parts_AvgCost_" +
      index +
      "' value='' class='input-group form-control 'style='text-align: center' readonly/>" +
      "</td>" +
      "<td>" +
      "<input type='button' id='parts_Del_" +
      index +
      "' value='DEL' class='input-group form-control btn btn-danger 'style='text-align: center' onclick='del_newAddRow(this)'/>" +
      "</td>"
  );
  $("#parts_table").children("tbody").append(tr);
}
function reload_toDash() {
  refreshAllData();
  toggle_MainSection("dashboard");
}
function del_newAddRow(ele) {
  var row = $(ele).prop("id").split("_")[2];
  $(ele).parent().parent().remove();
}
function ins_Parts() {
  var vid = $("#vehiclesSelect").val().split("_")[0].replace("#", "");
  var uid = sessionStorage.getItem("uid");
  var NewItemMaxRow = $(
    $(".newPartsCycleItem")[$(".newPartsCycleItem").length - 1]
  )
    .prop("id")
    .split("_")[2];
  var NewItemMinRow = $($(".newPartsCycleItem")[0]).prop("id").split("_")[2];
  var NewItemCnt = NewItemMaxRow - NewItemMinRow + 1;
  var InsertData = [];
  for (i = 0; i < NewItemCnt; i++) {
    var item = {
      part: $("#parts_SortItem_" + (parseInt(NewItemMinRow) + i)).val(),
      KM: $("#parts_KM_" + (parseInt(NewItemMinRow) + i)).val(),
      day: $("#parts_Day_" + (parseInt(NewItemMinRow) + i)).val(),
    };
    InsertData.push(item);
  }
  console.log(InsertData);
}
function refreshAllData() {
  var uid = sessionStorage.getItem("uid");
  sel_Vehicles(uid)
    .then(function () {
      create_VehiclesSelectOption();
      create_VehiclesTable();
      var vid = $("#vehiclesSelect").val().split("_")[0].replace("#", "");
      Promise.all([
        sel_FuelConsumption(uid, vid),
        sel_MaintainTable(uid, vid),
      ]).then(function () {
        create_MaintainCycleTable();
        create_FuelRecordTable();
        console.log("All data refresh OK.");
      });
    })
    .catch((error) => {
      console.error("有一個 Promise 失敗了:", error);
    });
}
// ! -- Function Area for DB data Initial ----------------------------------------------------------------------------
function sel_MaintainTable(uid, vid) {
  return new Promise((resolve, reject) => {
    var sql_c =
      "select * from " + car_MaintainTable_DBName + " where UserID=" + uid;
    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
      .then(function (data) {
        MaintainCycleTable = data;
        console.log(
          "POST_MaintainCycleTable Get " +
            MaintainCycleTable.length +
            " data, Status OK"
        );
        resolve(); // 確保在成功時調用 resolve
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        reject(error); // 確保在失敗時調用 reject
      });
  });
}

function sel_Vehicles(uid) {
  return new Promise((resolve, reject) => {
    var sql_c = "select * from " + car_Vehicles_DBName + " with(nolock) ";
    sql_c += "where [UserID] = '" + uid + "' ";

    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
      .then(function (data) {
        vehicalsTable = data;
        console.log(
          "POST_VehiclesTable Get " + vehicalsTable.length + " data, Status OK"
        );
        resolve(); // 確保在成功時調用 resolve
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        reject(error); // 確保在失敗時調用 reject
      });
  });
}

function sel_FuelConsumption(uid, vid) {
  return new Promise((resolve, reject) => {
    var sql_c = "select * from " + car_OilCon_DBName + " with(nolock) ";
    sql_c += "where [VehicleID] = '" + vid + "' ";
    var _para = { sql_code: sql_c };
    getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
      .then(function (data) {
        OilData = data;
        console.log("POST_OilData Get " + OilData.length + " data, Status OK");
        resolve(); // 確保在成功時調用 resolve
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        reject(error); // 確保在失敗時調用 reject
      });
  });
}
// ! -- Main Area ------------------------------------------------------------------------------
$(document).ready(function () {
  checkSignInStatus(); // todo -- 取得登入狀態
  refreshAllData();
});
