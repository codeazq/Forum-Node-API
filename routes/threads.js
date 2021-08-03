const express = require('express');
const router = express.Router();
const threadService = require('../services/threads');
require("../middleware/passport");
const blacklistedToken = require("../middleware/blacklistedToken");
const passport = require('passport');
const threadPolicy = require("../policies/thread.policy")

router.get('/', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    threadService.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                err.message || "Some error occured while trying to get the thread "
            });
        } else res.send(data);
    })
});

router.get('/:threadId/', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    threadService.find(req.params.threadId, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                err.message || "Something went wrong retriving the thread"
            })
        } else res.send(data);
    });
});

router.post('/', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save Thread in the database
    threadService.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Thread."
            });
        }
        else res.send(data);
    });
});

router.put('/:threadId', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    threadPolicy.update(req.user.id, threadId, (err, success) => {
        if (err) {
            res.status(401).send(err);
        } else {
            threadService.update(req.params.threadId, req.body, (err, data) => {
                if (err) {
                    res.status(400).send({
                        messsage:
                        err.message || "Some error occurred during update"
                    });
                } else {
                    res.send(data);
                }
            });
        }
    });
    
});

router.delete('/:threadId', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    threadPolicy.delete(req.user.id, threadId, (err, success) => {
        threadService.delete(req.params.threadId, (err, data) => {
            if (err) {
                res.status(400).send({
                    messsage:
                    err.message || "Some error occurred during update"
                });
            } else {
                res.send(data);
            }
        });
    });
});

module.exports = router;