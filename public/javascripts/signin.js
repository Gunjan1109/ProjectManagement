function login(){    
    console.log("in login")
var email = document.getElementById("email").value
var password = document.getElementById("password").value
var xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            document.cookie = "authorization=" + this.getResponseHeader("authorization")
            console.log(this.getResponseHeader)
            console.log("signin success")
            window.location = "/homepage"
        }
        else {
            document.getElementById("error").innerText = JSON.parse(this.responseText).message
        }
    }
}
xmlHttpRequest.open("POST", "/api/users/signin", true)
xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
xmlHttpRequest.send(JSON.stringify({ email: email, password: password }))
}

function register(){    
    console.log("in register")
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log("signup success")
                window.location = "/signuppage"
            }
            else {
                document.getElementById("error").innerText = JSON.parse(this.responseText).message
            }
        }
    }
    xmlHttpRequest.open("POST", "/api/users/signup", true)
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
    xmlHttpRequest.send(JSON.stringify({ name: name, email: email, password: password }))
}