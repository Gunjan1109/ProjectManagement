function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
}

function signout(){
  var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                  
                    window.location = "/";
                }
            }
        }
        xhttp.open("POST", "/api/users/signout", true);
        xhttp.setRequestHeader("Authorization", getCookie("authorization"));
        xhttp.send();
}

function updatetask(){
  console.log("in login")
  var pname = document.getElementById("pname").value
  var name = document.getElementById("name").value
  var status = document.getElementById("status")
    var opt = status.options[status.selectedIndex].value
  var xmlHttpRequest = new XMLHttpRequest()
  xmlHttpRequest.onreadystatechange = function () {
      if (this.readyState === 4) {
          if (this.status === 200) {
              
              console.log("signin success")
              window.location = "/homepage2/"+pname
          }
          else {
              document.getElementById("error").innerText = JSON.parse(this.responseText).message
          }
      }
  }
  xmlHttpRequest.open("PUT", "/api/task", true)
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
  xmlHttpRequest.setRequestHeader("Authorization", getCookie("authorization"));
  xmlHttpRequest.send(JSON.stringify({ name: name, status: opt }))
}

function registervalidate(){
  let name = document.getElementById("name").value
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  let nameerr = emailerr = passworderr = true;

  if (name == "") {
    printError("Please enter your name");
}
else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(name) === false) {
        printError("Please enter a valid name");
    }
    else {
        nameErr = false;
    }

    if (email == "") {
      printError("Please enter your email address");
  }
  else {
      var regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
          printError("Please enter a valid email address");
      } else {
          emailErr = false;
      }
  }

  if (password == "") {
    printError("Please enter a password")
}
else {
    passwordErr = false
}

if ((nameerr || emailerr ||passworderr) == true) {
  return false;
}
else {
  register()
}
}

function printError(msg) {
  document.getElementById("error").innerHTML = msg;
}
}

function signinvalidate(){
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  let emailerr = passworderr = true; 

  if (email == "") {
    printError("Please enter your email address");
}
else {
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
        printError("Please enter a valid email address");
    } else {
        emailErr = false;
    }
}

if (password == "") {
  printError("Please enter a password")
}
else {
  passwordErr = false
}

if ((emailerr ||passworderr) == true) {
return false;
}
else {
login()
}

function printError(msg) {
  document.getElementById("error").innerHTML = msg;
}
}