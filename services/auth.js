const User = require("../models/user.model");
const RevokedToken = require("../models/revokedToken.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

genToken = user => {
    return jwt.sign({
        iss: 'Joan_Louji',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'joanlouji');
}

const getTokenPayload = token => {
    return token.split('.')[1];
}

exports.logout = (token, result) => {
    const payload = getTokenPayload(token);

    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64'));
    const userId = decodedPayload.sub;
    const iat = decodedPayload.iat;

    const newRevokedToken = new RevokedToken({
                                                iat: iat,
                                                user_id: userId
                                            });
    RevokedToken.create(newRevokedToken, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, "Logout successful");
        }
    });
}

exports.login = (userName, password, result) => {
    User.findByName(userName, (err, res) => {
        if (err) {
            result({error: 'user does not exist, check username'}, null);
        } else {    
            if (bcrypt.compareSync(password, res.password)) {
                const token = genToken(res)
                result(null, token);
            } else {
                result("Password provided does not match", null);
            }
        }
    })
};

exports.register = (userName, password, result) => {
    User.findByName(userName, (err, res) => {
        if (err) {
            console.log(err)
            const newUser = new User({
                name: userName,
                password: bcrypt.hashSync(password, saltRounds),
                status: "active"
            });

            User.create(newUser, (err, res) => {
                if (err) {
                    console.log("error service: ", err);
                    result(err, null);
                } else {
                    console.log("successful reg", res);
                    const token = genToken(res)
                    result(null, token);
                }
            });
        } else {
            console.log(res)
            result({error: 'UserName is already in use'}, null)
        }
    }) 
}



