const Reply = require("../models/reply.model");
const ReplyPolicy = function() {}

ReplyPolicy.update = (user_id, replyId, callback) => {
    Reply.find(replyId, (err, reply) => {
        if (err) {
            callback({error: "unable to find reply"});
        } else {
            if (reply.user_id !== user_id) {
                callback({error: "User not authorized to update reply, reply created by another user"}, null);
            } else {
                callback(null, true);
            }
        }
    });
}

ReplyPolicy.delete = (user_id, replyId, callback) => {
    Reply.find(replyId, (err, reply) => {
        if (err) {
            callback({error: "unable to find reply"});
        } else {
            if (reply.user_id !== user_id) {
                callback({error: "User not authorized to delete reply, reply created by another user"}, null);
            } else {
                callback(null, true);
            }
        }
    });
}