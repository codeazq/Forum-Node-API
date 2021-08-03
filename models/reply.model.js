const { query } = require('./db');
const sql = require('./db');

const Reply = function(reply) {
    this.thread_id = reply.thread_id; 
    this.user_id = reply.user_id;
    this.body = reply.body;
}

Reply.create = (newReply, result) => {
    sql.query("INSERT INTO replies SET ?", newReply, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Reply created: ", { id: res.insertId, ...newReply })
            result(null, { id: res.insertId, ...newReply })
        }
    });
}

Reply.getByThreadId = (threadId, result) => {
    sql.query("SELECT * FROM replies WHERE thread_id = ?", [threadId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Replies in model: ", res);
            result(null, res);
        }
    });
}

Reply.find = (replyId, result) => {
    sql.query("SELECT * FROM replies WHERE id = ?", [replyId], (err, res) => {
        if (err) {
            result(err, null);
        } else if (res.length) {
            console.log("Reply found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Reply with the id
        result({ kind: "Reply not_found" }, null);
    });
}

Reply.update = (replyId, reply, result) => {
    sql.query(
        "UPDATE replies SET body = ? WHERE id = ?",
        [reply.body, replyId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }

            // Reply not found
            if (res.affectedRows == 0) {
                console.log("Not found");
                result({ kind: "not_found"}, null);
                return
            } else {
                console.log("Update reply", res)
                result(null, res)
            }
    });
}

Reply.delete = (replyId, result) => {
    sql.query("DELETE FROM replies WHERE id = ?", replyId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        // Reply not found
        if (res.affectedRows == 0) {
            console.log("Not found");
            result({ kind: "not_found"}, null);
            return
        } else {
            console.log("Delete reply", res);
            result(null, res)
        }
    });
}

module.exports = Reply;