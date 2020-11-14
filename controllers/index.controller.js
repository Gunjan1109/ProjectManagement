const http = require("http")
const User = require('../models/user.model')

exports.startpage = function (req, res) {
         res.render("index", { cssfile: "/stylesheets/css.css", bootfile: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css", title : "Beetle | Making work easy", bootint : "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T", bootorigin : "anonymous" })
     }

exports.signuppageOwner = function (req,res){
    res.render("registration",{isOwner : true, cssfile : "/stylesheets/style.css", jsfile : "/javascripts/main.js", title : "Register for Beetle" , fontfile : "/fonts/linearicons/style.css"})
}

exports.signuppageMember = function (req,res){
    res.render("registration",{isOwner : false, cssfile : "/stylesheets/style.css", jsfile : "/javascripts/main.js", title : "Register for Beetle" , fontfile : "/fonts/linearicons/style.css"})
}

exports.signinpageOwner = function (req,res){
    res.render("signin",{isOwner : true, cssfile : "/stylesheets/style.css", jsfile : "/javascripts/main.js", title : "Login for Beetle" , fontfile : "/fonts/linearicons/style.css"})
}

exports.signinpageMember = function(req,res){
    res.render("signin" , {isOwner : false, cssfile : "/stylesheets/style.css", jsfile : "/javascripts/main.js", title : "Login for Beetle" , fontfile : "/fonts/linearicons/style.css"})
}

exports.verify = function(req,res){
    res.render("verify")
}

exports.ownerhomepage = function (req, res) {
    
        var data = {}
        var promises = []
        if (req.cookies.authorization) {
            var userPromise = new Promise((resolve, reject) => {
                // Create options
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: "/api/owner/owner",
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
    
                // Make http request
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
    
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data.user = JSON.parse(buff)
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
    
                    })
                })
    
                httpReq.on("error", error => {
                    reject(error)
                })
    
                httpReq.end()
            })
            promises.push(userPromise)
            var projectPromise = new Promise((resolve, reject) => {
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: "/api/owner/projects",
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
    
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
    
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data.projects = JSON.parse(buff)
    
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
    
                    })
                })
    
                httpReq.on("error", error => {
                    reject(error)
                })
    
                httpReq.end()
    
            })
    
            promises.push(projectPromise)

            var privateprojectPromise = new Promise((resolve, reject) => {
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: "/api/owner/privateprojects",
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
    
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
    
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data.privateprojects = JSON.parse(buff)
    
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
    
                    })
                })
    
                httpReq.on("error", error => {
                    reject(error)
                })
    
                httpReq.end()
    
            })
    
            promises.push(privateprojectPromise)

    
            Promise.all(promises).then(() => {
                if (data)
                   
                res.render("beetle", {data : data ,kit : "https://kit.fontawesome.com/7a3d763a1b.js", title : "BEETLE" , cssfile : "/stylesheets/beetle.css" , jsfile : "/javascripts/main.js", bootfile : "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"})
            }).catch(error => {
                console.log(error)
                res.render("error", error)
            })
        }
    
        else
            res.render("beetle",{title : "BEETLE" , cssfile : "/stylesheets/beetle.css" , jsfile : "/javascripts/script.js", bootfile : "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"})
    
    }
    
    exports.memberhomepage = function (req, res) {
    
        var data = {}
        var promises = []
        if (req.cookies.authorization) {
            var userPromise = new Promise((resolve, reject) => {
                // Create options
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: "/api/member/member",
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
    
                // Make http request
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
    
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data.user = JSON.parse(buff)
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
    
                    })
                })
    
                httpReq.on("error", error => {
                    reject(error)
                })
    
                httpReq.end()
            })
            promises.push(userPromise)
            var projectPromise = new Promise((resolve, reject) => {
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: "/api/member/projects",
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
    
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
    
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data.projects = JSON.parse(buff)
    
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
    
                    })
                })
    
                httpReq.on("error", error => {
                    reject(error)
                })
    
                httpReq.end()
    
            })
    
            promises.push(projectPromise)

            var privateprojectPromise = new Promise((resolve, reject) => {
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: "/api/member/privateprojects",
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
    
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
    
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data.privateprojects = JSON.parse(buff)
    
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
    
                    })
                })
    
                httpReq.on("error", error => {
                    reject(error)
                })
    
                httpReq.end()
    
            })
    
            promises.push(privateprojectPromise)
            Promise.all(promises).then(() => {
                if (data)
                   
                res.render("beetle", {data : data , title : "BEETLE" , cssfile : "/stylesheets/beetle.css" , jsfile : "/javascripts/main.js", bootfile : "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"})
            }).catch(error => {
                console.log(error)
                res.render("error", error)
            })
        }
    
        else
            res.render("beetle",{title : "BEETLE" , cssfile : "/stylesheets/beetle.css" , jsfile : "/javascripts/script.js", bootfile : "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"})
    
    }
    
    exports.newproject = function(req,res){
        res.render("project",{title : "New Project",jsfile : "/javascripts/main.js" ,bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",  bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh", bootorigin : "anonymous"})
    }

    exports.ownerhomepage2 = function(req,res){
        var pname = req.params.pname
        if(pname.includes("%20")){
            pname.replace("%20"," ")
        }
        
        var data ={}
        var promises = []

        
        var projectPromise = new Promise((resolve, reject) => {
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: encodeURI("/api/owner/project/" + pname),
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.project = JSON.parse(buff)

                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()

        })

        promises.push(projectPromise)

        var userPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/api/owner/owner",
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            // Make http request
            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.user = JSON.parse(buff)
                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()
        })
        promises.push(userPromise)
        Promise.all(promises).then(() => {
            if (data)
            
            res.render("beetle2", {data : data ,kit : "https://kit.fontawesome.com/7a3d763a1b.js" , title : "BEETLE" , cssfile : "/stylesheets/homepage2.css" , jsfile : "/javascripts/main.js", bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" , bootint : "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" , bootorigin : "anonymous"})
        }).catch(error => {
            console.log(error)
            res.render("error", error)
        })
    }

    exports.memberhomepage2 = function(req,res){
       var pname = req.params.pname
        var data ={}
        var promises = []
        
        
        var projectPromise = new Promise((resolve, reject) => {
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: encodeURI("/api/member/" + pname),
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.project = JSON.parse(buff)

                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()

        })

        promises.push(projectPromise)

        var userPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/api/member/member",
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            // Make http request
            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.user = JSON.parse(buff)
                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()
        })
        promises.push(userPromise)
        Promise.all(promises).then(() => {
            if (data)
               
            res.render("beetle2", {data : data ,kit : "https://kit.fontawesome.com/7a3d763a1b.js" , title : "BEETLE" , cssfile : "/stylesheets/homepage2.css" , jsfile : "/javascripts/main.js", bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" , bootint : "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" , bootorigin : "anonymous"})
        }).catch(error => {
            console.log(error)
            res.render("error", error)
        })
    }

    exports.newTask = function(req,res){
        var data ={}
        var promises = []
        var pname = req.params.pname
        
        var projectPromise = new Promise((resolve, reject) => {
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: encodeURI("/api/owner/project/" + pname),
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.project = JSON.parse(buff)

                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()

        })

        promises.push(projectPromise)
        Promise.all(promises).then(() => {
            if (data)
               
                res.render("task",{data : data,title : "New Task",jsfile : "/javascripts/main.js", bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})
            }).catch(error => {
            console.log(error)
            res.render("error", error)
        })


    }

    exports.members = function (req, res) {
            var name = req.params.name
        
            var data = {}
            var promises = []
        
            var userPromise = new Promise((resolve, reject) => {
                // Create options
                const options = {
                    hostname: req.hostname,
                    port: 3000,
                    path: encodeURI("/api/owner/projectmember/" + name),
                    method: "GET",
                    headers: { authorization: req.cookies.authorization }
                }
        
                // Make http request
                const httpReq = http.request(options, httpRes => {
                    var buff = ""
                    httpRes.on("data", chunks => {
                        buff += chunks
                    })
        
                    httpRes.on("end", () => {
                        if (httpRes.statusCode === 200) {
                            data = JSON.parse(buff)
                            resolve()
                        }
                        else {
                            reject(JSON.parse(buff))
                        }
        
                    })
                })
        
                httpReq.on("error", error => {
                    reject(error)
                })
        
                httpReq.end()
            })
            promises.push(userPromise)
        
        
            Promise.all(promises).then(() => {
               
                res.render("members", {data : data ,jsfile : "/javascripts/main.js" ,title : "Members" , bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})
            }).catch(error => {
                console.log(error)
                res.render("error", error)
            })
        
        }

  exports.viewmembers = function(req,res){
    var name = req.params.name
        
    var data = {}
    var promises = []

    var userPromise = new Promise((resolve, reject) => {
        // Create options
        const options = {
            hostname: req.hostname,
            port: 3000,
            path: encodeURI("/api/member/projectmember/" + name),
            method: "GET",
            headers: { authorization: req.cookies.authorization }
        }

        // Make http request
        const httpReq = http.request(options, httpRes => {
            var buff = ""
            httpRes.on("data", chunks => {
                buff += chunks
            })

            httpRes.on("end", () => {
                if (httpRes.statusCode === 200) {
                    data = JSON.parse(buff)
                    resolve()
                }
                else {
                    reject(JSON.parse(buff))
                }

            })
        })

        httpReq.on("error", error => {
            reject(error)
        })

        httpReq.end()
    })
    promises.push(userPromise)


    Promise.all(promises).then(() => {
       
        res.render("viewmembers", {data : data ,jsfile : "/javascripts/main.js" ,title : "Members" , bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})
    }).catch(error => {
        console.log(error)
        res.render("error", error)
    })

  }      
        

exports.addmember = function(req,res){
    res.render("addmember" , {name : req.params.pname ,jsfile : "/javascripts/main.js" ,title : "Add Members" ,kit : "https://kit.fontawesome.com/7a3d763a1b.js" ,bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})
}

exports.updatetask = function(req,res){
    var data = {}
    data.pname = req.params.pname
    data.id = req.params.id
    data.name = req.params.name
    data.description = req.params.description
    data.author = req.params.author
    data.notes = req.params.notes
    data.assignedTo = req.params.assignedTo
    data.dueDate = req.params.dueDate
    data.status = req.params.status
    var promises = []
        var pname = req.params.pname
        
        var projectPromise = new Promise((resolve, reject) => {
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: encodeURI("/api/owner/project/" + pname),
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.project = JSON.parse(buff)

                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()

        })

        promises.push(projectPromise)
        Promise.all(promises).then(() => {
            if (data)
               
                res.render("updatetask",{data : data,jsfile : "/javascripts/main.js", title : "Edit Task" , bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})
            }).catch(error => {
            console.log(error)
            res.render("error", error)
        })


   
}

exports.updatetaskmember = function(req,res){
    var data = {}
    data.name = req.params.name
    data.id = req.params.id
    data.status = req.params.status
    res.render("updatetaskmember",{data : data,jsfile : "/javascripts/main.js", title : "Edit Task" , bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})

}

exports.myNewTask = function(req,res){
    res.render("mytask",{jsfile : "/javascripts/main.js", title : "Edit Task" , bootfile : "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",bootint : "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" , bootorigin : "anonymous"})
}
