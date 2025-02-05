// ! announcement
nav_dicts = {
  Index: "./index.html",
  Finance: "./finance.html",
  Car: "./car.html",
};

// ! main
$(document).ready(function () {
  var url = location.href
    .split("/")
    [location.href.split("/").length - 1].split(".")[0]
    .toUpperCase();
  console.log(url);
  console.log(Object.keys(nav_dicts).length);
  nav_append("nav_ui", nav_dicts);
  getData(url);
});
// ! function
$("#nav_AccountRecord").on("click", function () {
  alert("nav_bars.length");
});
function nav_append(id, dicts) {
  var nav_bars = $("#" + id);
  var s = location.pathname;
  $(Object.keys(dicts)).each(function (ind, val) {
    var active =
      val.toUpperCase() == s.split("/")[2].split(".")[0].toUpperCase()
        ? "active"
        : "";
    var a = $(`<li class="nav-item">
          <a class="nav-link ${active}" href="${dicts[val]}">${val}</a>
        </li>`);

    $("#nav_ui").append(a);
  });
}
function delClassName(btn, display, hide) {
  $(".subnav").removeClass("active");
  $(btn).addClass("active");
  $("." + hide).addClass("hide");
  var ele = $("#" + display);
  ele.removeClass("hide");
}
function getData(__name__) {
  var caseMapper = {
    CAR: ["Spend_table", "oilCon_table", "maintain_table", "summary_table"],
    FIN_1: "oilCon_table",
    FIN_2: "oilCon_table",
    FIN_3: "oilCon_table",
  };
  targetDict = caseMapper[__name__];
  switch (__name__) {
    case "CAR":
      url = [
        "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/工作表2:B1:F3?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
        "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/%E5%B7%A5%E4%BD%9C%E8%A1%A81?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
        "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/車用開銷?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
        "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/需更換?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M",
      ];
      for (var i = 0; i <= 3; i++) {
        getByID(url[i], caseMapper["CAR"][i]);
      }
      break;
    case "FINANCE":
      url =
        "https://sheets.googleapis.com/v4/spreadsheets/1re_Na3c34juFKTxicbN2fbV5q1lTvl0zCcVjO_reN3k/values/%E5%B7%A5%E4%BD%9C%E8%A1%A81?alt=json&key=AIzaSyC_BNFoQ9IjBzRETQGiMJ83c_1wWYpuM-M";

      break;
    default:
      break;
  }
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
