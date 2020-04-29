const http = require("http")

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

