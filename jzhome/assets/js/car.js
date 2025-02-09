// ! -- Global Area --------------------------------------------------------------------------
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
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("password");
      window.location.reload();
    });
  } else {
    $("#navSign").prop("href", "signin.html#finance");
    $("#navSign").prop("text", "Sign");
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
  jexcel(document.getElementById(tableID), {
    data: data[1],
    colHeaders: data[0],
  });
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
  // sht in ['工作表1','工作表2','車用開銷','需更換']
  var head =
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/";
  var range = rng ? "!" + rng : "";
  var sht = sht;
  var body = sht + range;
  var footer = "?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M";
  url = head + body + footer;
  var d;
  $.get(url, function (data) {
    d = data;
  })
    .done(function () {
      console.log("GET OK.");
      var dd = JSON.parse(JSON.stringify(d));
      return dd;
    })
    .fail(function () {
      console.log("GET Failed.");
      return;
    });
}

// ! -- Main Area ------------------------------------------------------------------------------
$(document).ready(function () {
  checkSignInStatus(); // todo -- 取得登入狀態
  ChartMaker(); // todo -- 製作圖表，範例測試用
  gsht_getData(); // todo -- get google sheet data by google api
  var data = sel_gsht("工作表1", "K1:N2");


  var _para = { Area: _Area };
  WSG_list = getAjaxData(
    "assets/asmx/xasmx.asmx",
    "sel_DX_Omega_WSG_DDL",
    _para
  );
});
