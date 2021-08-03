const express = require('express');
const router = express.Router();
const replyService = require("../services/replies");
require("../middleware/passport");
const blacklistedToken = require("../middleware/blacklistedToken");
const passport = require('passport');
const replyPolicy = require("../policies/reply.policy");

router.get('/threads/:threadId/replies', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    
    replyService.getByThreadId(req.params.threadId, (err, data) => {
        if (err) {
            console.log("error routes: ", err)
            res.status(500).send(err);
        } else {
            console.log("replies routes", data)
            res.send(data);
        }
    });
});


router.post('/threads/:threadId/replies', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    replyService.create(req.params.threadId, req.body, (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });    
});

router.get('/replies/:replyId', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    replyService.getById(req.params.replyId, (err, data) => {
        if (err) {
            res.status(500).send(data);
        } else {
            res.send(data);
        }
    });
});

router.put('/replies/:replyId', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    replyPolicy.update(req.user.id, replyId, (err, success) => {
        if (err) {
            res.status(401).send(err)
        } else {
            replyService.update(req.params.replyId, req.body, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(data);
                }
            });
        }
    });

    
});

router.delete('/replies/:replyId', passport.authenticate('jwt',{session: false}), blacklistedToken, function(req, res) {
    replyPolicy.delete(req.user.id, replyId, (err, success) => {
        if (err) {
            res.status(401).send(err);
        } else {
            replyService.delete(req.params.replyId, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(data);
                } 
            });     
        }
    });
});

module.exports = router;