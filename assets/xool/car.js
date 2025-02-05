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
function dataToList(data, targetDict) {
  var item = [];
  var items = [];
  var rowNum = data.length;
  var colNum = Object.keys(data[0]).length;
  dataa = data_preProcess(data);
  // console.log(dataa[1]);
  jexcel(document.getElementById(targetDict), {
    data: dataa[1],
    colHeaders: dataa[0],
    colWidths: [100, 100, 100, 100, 100, 100],
  });
}
function getByID(url, tableid) {
  $.get(url, function (data) {
    var d = data["values"];
    dataToList(d, tableid);
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
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/%E5%B7%A5%E4%BD%9C%E8%A1%A81?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/車用開銷?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
    "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/需更換?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
  ];
  getByID(url[1], "c_table");
}

$(document).ready(function () {
  checkSignInStatus();
  ChartMaker();
  gsht_getData()
});
