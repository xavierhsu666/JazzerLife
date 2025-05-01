// ! -- Global Area ------------------------------------------------------------------------
// ! -- Function Area ----------------------------------------------------------------------
function signinData_check(data) {
  var chk_rlt = "";
  // todo 1 檢查account ....
  if (data.account == NaN || data.account == "") {
    chk_rlt += "帳號不可為空\n";
  } else if (data.account.length < 6 || data.account.length > 20) {
    chk_rlt += "帳號長度須為6~20碼\n";
  }
  // todo 2 檢查pwd ....
  if (data.password == NaN || data.password == "") {
    chk_rlt += "密碼不可為空\n";
  } else if (data.password.length < 6 || data.password.length > 20) {
    chk_rlt += "密碼長度須為6~20碼\n";
  }

  // todo end summary ....
  if (chk_rlt == "") {
    return true;
  } else {
    return false;
  }
}
function clickSubmit(btn) {
  signindata = {
    account: $("#account").val(),
    password: $("#password").val(),
    chk_rlt: false,
  };
  // 格式比對
  format_chk_rlt = signinData_check(signindata);
  if (!format_chk_rlt) {
    alert("帳號或密碼錯誤，請重新嘗試!");
    window.location.reload();
    return;
  }
  // 帳密比對
  db_chk_rlt = checkMembership(signindata);
  // 回傳uid等等相關資料
  rlt_data = db_chk_rlt[1];
  db_chk_rlt = db_chk_rlt[0];

  console.log(db_chk_rlt);
  if (format_chk_rlt && db_chk_rlt) {
    sessionStorage.setItem("account", signindata.account);
    sessionStorage.setItem("password", signindata.password);
    sessionStorage.setItem("uid", rlt_data[0].UserID);
    if (sourcePage != undefined) {
      window.location.assign("./" + sourcePage + ".html"); //跳轉到HTTP://www.google.com
    } else {
      window.location.assign("./index.html"); //跳轉到HTTP://www.google.com
    }
  } else {
    alert("帳號或密碼錯誤，請重新嘗試!");
    window.location.reload();
  }
}
function checkMembership(signindata) {
  var sql_c = "select * from " + mem_User_DBName + " with(nolock) ";
  sql_c +=
    "where [UserName] = '" +
    signindata.account +
    "' and [PasswordHash] = '" +
    signindata.password +
    "' ";

  var _para = { sql_code: sql_c };
  data = getAjaxData("../assets/asmx/xasmx.asmx", "meta_sql", _para);
  console.log(data);
  if (data.length == 1) {
    return [true, data];
  } else {
    return [false, data];
  }
}
// ! -- Main Area ------------------------------------------------------------------------------
$(document).ready(function () {});
