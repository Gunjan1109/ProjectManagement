// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const Token = require("../models/user.token.model");

module.exports = async function(req, res, next) {
  const tokenId = req.headers["authorization"];
  console.log(tokenId)
  if (!tokenId) {
    // 401 : Unauthorized
    return res.status(401).send({ message: "No User token provided" });
  }

  var token = await Token.findById(tokenId);
  if (!token) {
    // 403 : Forbidden
    return res.status(403).send({ message: "Invalid User token" });
  }

  // set token in request for further use
  // this creates a new key called token and add's it to req json
  req.token = token;

  // make sure to call next
  next();
};
