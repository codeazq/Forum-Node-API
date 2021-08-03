const Reply = require("../models/reply.model");

exports.create = (threadId, replyData, result) => {
    const reply = new Reply({
        thread_id: threadId,
        user_id: replyData.userId,
        body: replyData.body
    });

    Reply.create(reply, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res);
        }
    });
}

exports.getById = (replyId, result) => {
    Reply.find(replyId, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

exports.getByThreadId = (threadId, result) => {
    Reply.getByThreadId(threadId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

exports.update = (replyId, replyData, result) => {
    Reply.update(replyId, replyData, (err, res) => {
        if (err) {
            result(err, null);
        } else{
            result(null, res)
        }
    });
}

exports.delete = (replyId, result) => {
    Reply.delete(replyId, (err, res) => {
        if (err) {
            result(err, null);
        } else{
            result(null, res)
        }
        
    });
}