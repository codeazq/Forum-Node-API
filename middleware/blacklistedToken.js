const RevokedToken = require("../models/revokedToken.model")

const checkToken = (req, res, next) => {
    //check if the token has been blacklisted
    const token = req.headers.authorization.replace("Bearer", "");
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64'));
    const userId = decodedPayload.sub;
    const iat = decodedPayload.iat;
  
    
    RevokedToken.find(iat, userId, (err, blacklistedToken) => {
        if (err) {
            // user token not found
            console.log("user token not found in revoked tokens")
            next();
        } else {
            // user token found in revoked tokens
            console.log("user token found in revoked tokens")
            res.status(401).send({
                                    error: "User already logged out",
                                    message: "token revoked"
                                })
        }
    });   
}

module.exports = checkToken