const http = require("http")

exports.homepage = function(req,res) {
    console.log('cookies :' , req.cookies)

    var data = {}

    if (req.cookies.authorization){
        const options = {
            hostname: req.hostname,
            port: 3000,
            path: "/users",
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
                    data.user = JSON.parse(buff)
                }

              
    })

    httpReq.end()

    res.render("index" , data)

})
    }

    else
    res.render("index")
}

exports.signinpage = function(req,res) {
    res.render("signin")
}

exports.signuppage = function (req,res){
    res.render("signup")
}

