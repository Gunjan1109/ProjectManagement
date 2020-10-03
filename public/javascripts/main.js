
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
                //  document.cookie = ";, path = '/"
                    window.location = "/";
                }
            }
        }
        xhttp.open("POST", "/api/owner/signout", true);
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
              
              console.log("Update success")
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
  if(name == ""){
    document.getElementById('invalid-name').innerHTML = "Please enter your name"
    document.getElementById('invalid-name').style.color = "red"
    document.getElementById('name').focus()
    return false
  }
  else{
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(name) === false){
      document.getElementById('invalid-name').innerHTML = "Please enter a valid name"
      document.getElementById('invalid-name').style.color = "red"
      document.getElementById('name').focus()
      return false
    }
  }
  
  let email = document.getElementById("email").value
  if(email == ""){
      document.getElementById('invalid-email').innerHTML = "Please enter your email"
      document.getElementById('invalid-email').style.color = "red"
      document.getElementById('email').focus()
      return false
  }
  else{
    var regex = /^\S+@\S+\.\S+$/;
    if(regex.test(email) === false){
      document.getElementById('invalid-email').innerHTML = "Please enter a valid email"
      document.getElementById('invalid-email').style.color = "red"
      document.getElementById('email').focus()
      return false
    }
  }

  let password = document.getElementById("password").value
  if(password == ""){
    document.getElementById('invalid-pass').innerHTML = "Please enter a password"
    document.getElementById('invalid-pass').style.color = "red"
    document.getElementById('password').focus()
    return false
  }
  else{
    var regex = new RegExp('[0-9]')
    if(regex.test(password) == false || password.length < 8){
      document.getElementById('invalid-pass').innerHTML = "Minimum 8 characters with at least 1 digit"
      document.getElementById('invalid-pass').style.color = "red"
      document.getElementById('password').focus()
      return false
    }
  }
  

  register()
}

// function printError(msg) {
//   document.getElementById("error").innerHTML = msg;
// }


function signinvalidate(){
  let email = document.getElementById('email').value
  if(email == ""){
    document.getElementById('invalid-email').innerHTML = "Please enter your email"
    document.getElementById('invalid-email').style.color = "red"
    document.getElementById('email').focus()
    return false
}
else{
  var regex = /^\S+@\S+\.\S+$/;
  if(regex.test(email) === false){
    document.getElementById('invalid-email').innerHTML = "Please enter a valid email"
    document.getElementById('invalid-email').style.color = "red"
    document.getElementById('email').focus()
    return false
  }
}

let password = document.getElementById("password").value
if(password == ""){
  document.getElementById('invalid-pass').innerHTML = "Please enter a password"
  document.getElementById('invalid-pass').style.color = "red"
  document.getElementById('password').focus()
  return false
}
else {
login()
}


}


function login(){    
  console.log("in login")
var email = document.getElementById("email").value
var password = document.getElementById("password").value
var isowner = document.getElementById('isOwner').innerHTML
if(isowner == "true"){
var xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.onreadystatechange = function () {
  if (this.readyState === 4) {
      if (this.status === 200) {
        var check =  JSON.parse(this.responseText).user.isOwner
        console.log(check);
        if(check){
          document.cookie = "authorization=" + this.getResponseHeader("authorization")
          console.log("signin success")
          window.location = "/ownerhomepage"
        }
        else{
          document.getElementById("error").innerText = "Login as Employee"
        }
          
      }
      else {
          document.getElementById("error").innerText = JSON.parse(this.responseText).message
      }
  }
}
xmlHttpRequest.open("POST", "/api/owner/signin", true)
xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
xmlHttpRequest.send(JSON.stringify({ email: email, password: password }))   
}
else{
  var xmlHttpRequest = new XMLHttpRequest()
  xmlHttpRequest.onreadystatechange = function () {
  if (this.readyState === 4) {
      if (this.status === 200) {
        var check =  JSON.parse(this.responseText).user.isOwner
        console.log(check);
        if(!check){
          console.log("signin success")
          document.cookie = "authorization=" + this.getResponseHeader("authorization")
          window.location = "/memberhomepage"
        }
        else
        document.getElementById("error").innerText = "Login as Manager"
          
      }
      else {
          document.getElementById("error").innerText = JSON.parse(this.responseText).message
      }
  }
}
xmlHttpRequest.open("POST", "/api/member/signin", true)
xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
xmlHttpRequest.send(JSON.stringify({ email: email, password: password }))  
}
}


function register(){    
  console.log("in register")
  var name = document.getElementById("name").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  var isOwner = document.getElementById("isOwner").innerHTML
  if(isOwner == "true"){
  var xmlHttpRequest = new XMLHttpRequest()
  xmlHttpRequest.onreadystatechange = function () {
      if (this.readyState === 4) {
          if (this.status === 200) {
              console.log("signup success")
              document.cookie = "authorization=" + this.getResponseHeader("authorization")
              window.location = "/verify"
              
          }
          else {
              document.getElementById("error").innerText = JSON.parse(this.responseText).message
          }
      }
  }
  xmlHttpRequest.open("POST", "/api/owner/signup", true)
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
  xmlHttpRequest.send(JSON.stringify({ name: name, email: email, password: password,isOwner : isOwner }))
}
else{
  var xmlHttpRequest = new XMLHttpRequest()
  xmlHttpRequest.onreadystatechange = function () {
      if (this.readyState === 4) {
          if (this.status === 200) {
              console.log("signup success")
              document.cookie = "authorization=" + this.getResponseHeader("authorization")
              window.location = "/verify"
              
          }
          else {
              document.getElementById("error").innerText = JSON.parse(this.responseText).message
          }
      }
  }
  xmlHttpRequest.open("POST", "/api/member/signup", true)
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
  xmlHttpRequest.send(JSON.stringify({ name: name, email: email, password: password,isOwner : isOwner }))
}
}

function validateproject(){
  let name = document.getElementById('name').value
  if(name == ""){
    document.getElementById('invalid-name').innerHTML = "Please enter Project name"
    document.getElementById('invalid-name').style.color = "red"
    document.getElementById('name').focus()
    return false
  }
  let select = document.getElementById('select').value
  if(!select){
    document.getElementById('invalid-select').innerHTML = "Please select a option"
    document.getElementById('invalid-select').style.color = "red"
    
    return false
  }
  else{
    project()
  }
}

function project(){
  var name = document.getElementById("name").value
var access = document.getElementById("select")
var opt = access.options[access.selectedIndex].value
var xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.onreadystatechange = function () {
if (this.readyState === 4) {
  if (this.status === 200) {
      console.log("Creation of project success")
      window.location = "/ownerhomepage"
  }
  else {
      document.getElementById("error").innerText = JSON.parse(this.responseText).message
  }
}
}
xmlHttpRequest.open("POST", "/api/owner/project", true)
xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
xmlHttpRequest.setRequestHeader("authorization", getCookie("authorization"));
xmlHttpRequest.send(JSON.stringify({ name: name, accessType: opt }))
}



function validatetask(){
  let tname = document.getElementById('tname').value
  if(tname == ""){
    document.getElementById('invalid-tname').innerHTML = "Please enter Task name"
    document.getElementById('invalid-tname').style.color = "red"
    document.getElementById('tname').focus()
    return false
}

let desc = document.getElementById("desc").value
if(desc == ""){
  document.getElementById('invalid-desc').innerHTML = "Please enter Task description"
  document.getElementById('invalid-desc').style.color = "red"
  document.getElementById('desc').focus()
  return false
}

let dueDate = document.getElementById("dueDate").value
if(dueDate == ""){
  document.getElementById('invalid-dueDate').innerHTML = "Please give a deadline"
  document.getElementById('invalid-dueDate').style.color = "red"
  document.getElementById('dueDate').focus()
  return false
} 

let assigned = document.getElementById("assigned").value
if(assigned == ""){
  document.getElementById('invalid-assigned').innerHTML = "Please select a email-id to assign task"
  document.getElementById('invalid-assigned').style.color = "red"
  return false
} 
else {
task()
}
}

function validateMytask(){
  let tname = document.getElementById('tname').value
  if(tname == ""){
    document.getElementById('invalid-tname').innerHTML = "Please enter Task name"
    document.getElementById('invalid-tname').style.color = "red"
    document.getElementById('tname').focus()
    return false
}

let desc = document.getElementById("desc").value
if(desc == ""){
  document.getElementById('invalid-desc').innerHTML = "Please enter Task description"
  document.getElementById('invalid-desc').style.color = "red"
  document.getElementById('desc').focus()
  return false
}

let dueDate = document.getElementById("dueDate").value
if(dueDate == ""){
  document.getElementById('invalid-dueDate').innerHTML = "Please give a deadline"
  document.getElementById('invalid-dueDate').style.color = "red"
  document.getElementById('dueDate').focus()
  return false
} 

else {
mytask()
}

}

function task(){
  var pname = document.getElementById("pname").value
  var name = document.getElementById("tname").value
  var desc = document.getElementById("desc").value
  var note = document.getElementById('note').value
  if(note == ""){
    note = "No Notes provided"
  }
  var pic;
    if ($ ('#file').val () != '') {
      var imageUploaded = $ ('#file')[0].files[0];
      console.log("file uplaod" + imageUploaded);
      pic = imageUploaded
    }
  if($('#file').val() == ''){
    file = "no file provided"
  }
  console.log("file " + file);
  
  var dueDate = document.getElementById("dueDate").value  
  var access = document.getElementById("assigned")
var assigned = access.options[access.selectedIndex].value
var xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.onreadystatechange = function () {
if (this.readyState === 4) {
  if (this.status === 200) {
      console.log("Creation of Task success")
     // window.location = "/ownerhomepage2/" + pname
  }
  else {
      document.getElementById("error").innerText = JSON.parse(this.responseText).message
  }
}
}
// xmlHttpRequest.open("POST", "/api/owner/task/" + pname, true)
// xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
// xmlHttpRequest.setRequestHeader("authorization", getCookie("authorization"));
// xmlHttpRequest.send(JSON.stringify({ pname: pname, name : name , description : desc ,file:pic, assignedTo : assigned,dueDate : dueDate,notes : note}))
 }

function mytask(){
  var name = document.getElementById("tname").value
  var desc = document.getElementById("desc").value
  var note = document.getElementById('note').value
  var dueDate = document.getElementById("dueDate").value
  var assigned = document.getElementById('assigned').value
var xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.onreadystatechange = function () {
if (this.readyState === 4) {
  if (this.status === 200) {
      console.log("Creation of Task success")
      window.location = "/ownerhomepage2/" + pname
  }
  else {
      document.getElementById("error").innerText = JSON.parse(this.responseText).message
  }
}
}
xmlHttpRequest.open("POST", "/api/owner/", true)
xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
xmlHttpRequest.setRequestHeader("authorization", getCookie("authorization"));
xmlHttpRequest.send(JSON.stringify({name : name , description : desc , assignedTo : assigned,dueDate : dueDate,notes : note}))

}