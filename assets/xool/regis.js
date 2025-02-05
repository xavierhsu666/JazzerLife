function registerData_check(data) {
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
  // todo 3 檢查username ....
  if (data.username == NaN || data.username == "") {
    chk_rlt += "username不可為空\n";
  } else if (data.username.length < 6 || data.username.length > 20) {
    chk_rlt += "username長度須為6~20碼\n";
  }
  // todo 4 檢查email ....
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (data.email == NaN || data.email == "") {
    chk_rlt += "email不可為空\n";
  } else if (!emailRegex.test(data.email)) {
    chk_rlt += "email格式不正確\n";
  }
  // todo 5 檢查phone ....
  const phoneRegex = /09[0-9]{8,8}$/;
  if (data.phone == NaN || data.phone == "") {
    chk_rlt += "phone不可為空\n";
  } else if (data.phone.length != 10) {
    chk_rlt += "phone長度須為10碼\n";
  } else if (!phoneRegex.test(data.phone)) {
    chk_rlt += "phone格式不正確\n";
  }
  // todo end summary ....
  if (chk_rlt == "") {
    return true;
  } else {
    alert(chk_rlt);
    return false;
  }
}
function register(btn) {
  registerdata = {
    username: $("#username").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    account: $("#account").val(),
    phone: $("#phoneNumber").val(),
    chk_rlt: false,
  };
  chk_rlt = registerData_check(registerdata);
  registerdata.chk_rlt = chk_rlt;
  console.log(registerdata);
}
