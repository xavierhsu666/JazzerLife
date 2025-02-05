var s = location.pathname;
var t = (url = location.href);
sourcePage = t.split("#")[1];

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
  chk_rlt = signinData_check(signindata);
  signindata.chk_rlt = chk_rlt;
  console.log(signindata);
  if (signindata.chk_rlt) {
    sessionStorage.setItem("account", signindata.account);
    sessionStorage.setItem("password", signindata.password);
    var a = url.replace('signin.html#','')+".html"
    window.location.assign(a);//跳轉到HTTP://www.google.com
  }
}
