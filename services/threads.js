const Thread = require("../models/thread.model");
const Reply = require("../models/reply.model");

exports.getAll = function (result) {
    Thread.getAll((err, data) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        result(null, data);
    })
}

exports.find = function (threadId, result) {
    Thread.find(threadId, (err, thread) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);            
        } else {
            Reply.getByThreadId(threadId, (err, replies) => {
                if (err) {
                    console.log("error: ", err)
                } else {
                    thread.replies = replies;
                   result(null, thread);
                }
            });
        }
    });
};

exports.create = (threadData, result) => {
    // Create an Thread
    const thread = new Thread({
        user_id: threadData.user_id,
        title: threadData.title,
        body: threadData.body
    });
    
    // Save Thread in the database
    Thread.create(thread, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Thread Service: ", { ...data });
        result(null, data);
    });
}

exports.update = (threadId, threadData, result) => {
    Thread.update(threadId, threadData, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Thread Updates: ", { ...data});
        result(null, data);
    });
} 

exports.delete = (threadId, result) => {
    Thread.delete(threadId, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Thread Deleted: ", { ...data});
        result(null, data);
    });
}
