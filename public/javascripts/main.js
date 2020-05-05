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

