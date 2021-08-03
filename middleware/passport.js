const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/user.model");
const RevokedToken = require("../models/revokedToken.model");


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'joanlouji'
},
    function (jwtPayload, done) {
        console.log("token passport: ", jwtPayload);
        User.findById(jwtPayload.sub, (err, user) => {
            if (err) {
                console.log("error: ", err);
                done(err, null);
            } else {
                console.log("user in passport.js:", user)
                done(null, user);
            }
        })  
    }
))