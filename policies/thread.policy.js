const Thread = require("../models/thread.model");
const ThreadPolicy = function() {}

ThreadPolicy.update = (user_id, threadId, callback) => {
    Thread.find(threadId, (err, thread) => {
        if (err) {
            callback({error: "Unable to find thread"}, null);
        } else {
            if (thread.user_id !== user_id) {
                callback({error: "User not authorized to update thread, thread created by another user"}, null);
            } else {
                callback(null, true);
            }
        }
    });
}

ThreadPolicy.delete = (user_id, threadId, callback) => {
    Thread.find(threadId, (err, thread) => {
        if (err) {
            callback({error: "Unable to find thread"}, null);
        } else {
            if (thread.user_id !== user_id) {
                callback({error: "User not authorized to delete thread, thread created by another user"}, null);
            } else {
                callback(null, true);
            }
        }
    }); 
}

module.exports = ThreadPolicy