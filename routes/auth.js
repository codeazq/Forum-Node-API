const express = require('express');
const router = express.Router();
const authService = require("../services/auth");
require("../middleware/passport");
const blacklistedToken = require("../middleware/blacklistedToken");
const passport = require('passport');

router.post('/register', function(req, res) {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        authService.register(req.body.name, req.body.password, (err, data) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
    }
});

router.post('/login', function(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        authService.login(req.body.name, req.body.password, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
    }    
});

router.post('/logout', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    const token = req.headers.authorization.replace("Bearer", "");
    authService.logout(token, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;