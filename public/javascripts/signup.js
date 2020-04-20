function register(){    
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                document.cookie = "authorization=" + this.getResponseHeader("authorization")
                console.log("signup success")
                window.location = "/signinpage"
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