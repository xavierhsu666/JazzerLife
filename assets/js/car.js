// ! -- Global Area --------------------------------------------------------------------------
var OilData;
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

function ChartMaker() {
  "use strict";
  var wdict = {
    index: [1, 2, 3, 4, 5, 6, 7],
    detail: [100, -200, 300, 400, -50, -257, 300],
    title: ["食", "衣", "住", "行", "育樂", "育樂", "育樂"],
    time: ["w1", "w2", "w1", "w3", "w4", "w4", "w4"],
  };
  feather.replace();

  // Graphs
  var ctx = document.getElementById("myChart");
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
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
function GetUsersVehicles() {
  var sql_c = "select * from " + car_Vehicles_DBName + " with(nolock) ";
  sql_c += "where [UserID] = '" + sessionStorage.getItem("uid") + "' ";

  var _para = { sql_code: sql_c };
  getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para).then(
    function (data) {
      data.forEach(function (i, val) {
        // console.log(i);
        // todo 建立上方select的清單
        var option = document.createElement("option");
        $(option).html("#" + i.VehicleID + "_" + i.Model);
        if (val == 0) {
          $(option).prop("selected", true);
        }
        $("#vehiclesSelect").append(option);

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
      sel_vehiclesRelateData();
    }
  );
}
function sel_vehiclesRelateData() {
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
  sel_gsht("工作表1", "K1:N2")
    .then((data) => {
      const price = getOilPrice(data, type);
      $("#oilPrice").val(price);
      $("#oilKM_Record").val(OilData[OilData.length - 1].OdometerReading);
      $("#oilLiter_Record").val(OilData[OilData.length - 1].FuelAmount);
      console.log(OilData);
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
  var lastRecord = OilData[OilData.length - 1];
  var oilPrice = $("#oilPrice").val();
  var oilKM_Record = $("#oilKM_Record").val();
  var oilLiter_Record = $("#oilLiter_Record").val();
  var DistanceTravelled = oilKM_Record - lastRecord.OdometerReading;
  var FuelEfficiency = Math.round(DistanceTravelled / oilLiter_Record, 2);
  var sql_c =
    "INSERT INTO " +
    car_OilCon_DBName +
    " (VehicleID, OdometerReading, FuelAmount, FuelCost, DistanceTravelled, FuelEfficiency )";
  sql_c +=
    "VALUES ('" +
    lastRecord.VehicleID +
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

  var _para = { sql_code: sql_c };
  getAjaxData_promise("../assets/asmx/xasmx.asmx", "meta_sql", _para)
    .then(function (data) {
      console.log("上傳成功");
      window.location.reload();
    })
    .catch(function (error) {
      alert("上傳失敗，請洽系統管理員");
      window.location.reload();
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
        window.location.reload();
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        window.location.reload();
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
        window.location.reload();
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        window.location.reload();
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
        window.location.reload();
      })
      .catch(function (error) {
        alert("上傳失敗，請洽系統管理員");
        window.location.reload();
      });
  }
}
function add_Vihecle() {
  show_toggleEle("Vehicle_edit_area");
}
// ! -- Main Area ------------------------------------------------------------------------------
$(document).ready(function () {
  checkSignInStatus(); // todo -- 取得登入狀態
  GetUsersVehicles(); // todo -- 取得車輛資訊
  // ChartMaker(); // todo -- 製作圖表，範例測試用
  // gsht_getData(); // todo -- get google sheet data by google api
  // var data = sel_gsht("工作表1", "K1:N2");
  // var _para = { Area: _Area };
  // WSG_list = getAjaxData(
  //   "assets/asmx/xasmx.asmx",
  //   "sel_DX_Omega_WSG_DDL",
  //   _para
  // );
});
