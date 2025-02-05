
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
  checkSignInStatus();