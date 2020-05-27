const http = require("http")
const User = require('../models/user.model')
exports.homepage = function(req,res) {
    console.log('cookies :' , req.cookies)

    var data = {}
    var promises = []
    if (req.cookies.authorization) {
        var userPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/api/users",
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
            console.log(data)
            res.render("beetle", data)
        }).catch(error => {
            console.log(error)
            res.render("error", error)
        })
    }

    else
    res.render("beetle")

    }

exports.homepage2 =function(req,res){
    console.log(req.params.pname)
    var pname = req.params.pname
    var data = {}
    var promises = []
    console.log("in homepage2")
    
        var userPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/api/projects/"+pname,
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
            console.log(data)
            res.render("beetle2", data)
        }).catch(error => {
            console.log(error)
            res.render("error", error)
        })
    

}    

exports.profile  =function(req,res){
    var data = {}
    var promises = []

    var userPromise = new Promise((resolve, reject) => {
        // Create options
        const options = {
            hostname: req.hostname,
            port: 3000,
            path: "/api/users/",
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
        console.log(data)
        res.render("profile", data)
    }).catch(error => {
        console.log(error)
        res.render("error", error)
    })


    }


exports.startpage = function(req,res){
    res.render("index")
}
    


exports.signinpage = function(req,res) {
    res.render("signin")
}

exports.signuppage = function (req,res){
    console.log("in signup api")
    res.render("registration")
}

exports.projectpage = function (req,res){
    res.render("project")
}

exports.taskpage = function(req,res){
     var data = {}
    data.project = req.params.pname
    console.log(data)
    res.render("task",data)
}

// exports.members = function(req,res){
//     var pname = req.params.pname


// }

exports.updatetask = function(req,res){
    
    res.render("updatetask")
}

exports.deletetask = function(req,res){
   
    var pname = req.params.name
    var id = req.params.id
    var data = {}
    var promises = []
    console.log("in delete")
    
        var taskPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/api/task/"+id,
                method: "DELETE",
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

        
        promises.push(taskPromise)

        var userPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/api/projects/"+pname,
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
            console.log(data)
            res.render("beetle2", data)
        }).catch(error => {
            console.log(error)
            res.render("error", error)
        })
    
}