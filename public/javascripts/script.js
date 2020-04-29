
function projectpage(){
    window.location = "/projectpage";
  }

  function openproject(name){
        
        var xmlHttpRequest = new XMLHttpRequest()
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    console.log("signin success")
                    window.location = "/homepage"
                }
                else {
                    document.getElementById("error").innerText = JSON.parse(this.responseText).message
                }
            }
        }
        xmlHttpRequest.open("POST", "/api/projects", true)
        xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
        xmlHttpRequest.send(JSON.stringify({name : name}))
  }