

document.getElementById("login-btn").addEventListener("click", function () {
  //1- get the mobile number input
  
  const Inputuser = document.getElementById("input-user");
  const  user = Inputuser.value;

  //2- get the pin input

  const inputPass = document.getElementById("input-pass");
  const pass = inputPass.value;

  //3- match user & pass

  if ( user == "admin" &&  pass == "admin123") {
    //3-1 true:::>> alert> homepage

    alert("login Success");

    // window.location.replace("/home.html");

    window.location.assign("./home.html");
  } else {

    //3-2 false:::>> alert> return

    alert("login Failed");
    return;
  }
});