// ! -- Global Area ------------------------------------------------------------------------
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
  }
}
function ChartMaker(wdict) {
  "use strict";
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
// ! -- Main Area ------------------------------------------------------------------------------
$(document).ready(function () {
  var wdict = {
    index: [1, 2, 3, 4, 5, 6, 7],
    detail: [100, -200, 300, 400, -50, -257, 300],
    title: ["食", "衣", "住", "行", "育樂", "育樂", "育樂"],
    time: ["w1", "w2", "w1", "w3", "w4", "w4", "w4"],
    account: ["w1", "w2", "w1", "w3", "w4", "w4", "w4"],
  };
  function removeTrendChart() {
    $("#targetTable>tbody").children().remove();

    for (var i = 0; i < wdict.detail.length; i++) {
      $("#targetTable>tbody").append(
        "<tr><td>" +
          wdict.index[i] +
          "</td><td>" +
          wdict.title[i] +
          "</td><td>" +
          wdict.detail[i] +
          "</td><td>" +
          wdict.time[i] +
          "</td><td>" +
          wdict.account[i] +
          "</td></tr>"
      );
    }
  }

  checkSignInStatus();
  ChartMaker(wdict);
  removeTrendChart();
});
