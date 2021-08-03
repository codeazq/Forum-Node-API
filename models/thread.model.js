const sql = require('./db.js');

// constructor
const Thread = function(thread) {
    this.user_id = thread.user_id;
    this.title = thread.title;
    this.body = thread.body;
}

Thread.create = (newThread, result) => {
    sql.query("INSERT INTO threads SET ?", newThread, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Thread: ", { id: res.insertId, ...newThread });
        result(null, { id: res.insertId, ...newThread });
    });
};

Thread.getAll = result => {
    sql.query("SELECT * FROM threads", (err, res) => {
        if(err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        console.log("threads: ", res);
        result(null, res)
    });
}

Thread.find = (threadId, result) => {
    sql.query(`SELECT * FROM threads WHERE id = ${threadId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        if (res.length) {
            console.log("found thread: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
}

Thread.update = (threadId, thread, result) => {
    sql.query(
        "UPDATE threads SET title = ?, body = ?, best_reply_id = ? WHERE id = ?", 
        [thread.title, thread.body, thread.best_reply_id, threadId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }

            if (res.affectedRows == 0) {
                // not found Thread with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("thread: ", res);
            result(null, res)
    });
}

Thread.delete = (threadId, result) => {
    sql.query("DELETE FROM threads WHERE id = ?", threadId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Thread with the threadId
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted thread with id: ", threadId);
        result(null, res);
    });
  };


module.exports = Thread;