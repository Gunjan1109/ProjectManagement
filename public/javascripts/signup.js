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
                document.getElementById("message").innerHTML = JSON.parse(this.responseText).message
                
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