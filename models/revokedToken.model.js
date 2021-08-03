const sql = require('./db.js');

const RevokedToken = function(tokenPayload) {
    this.iat = tokenPayload.iat
    this.user_id = tokenPayload.user_id
}

RevokedToken.create = (newRevokedToken, result) => {
    sql.query("INSERT INTO revoked_tokens SET ?", newRevokedToken, (err, res) => {
        if (err) {
            console.log("error; ", err);
            result(err, null);
        } else {
            result(null, { id: res.insertId, ...newRevokedToken });
        }
    });
}

RevokedToken.find = (iat, user_id, result) => {
    sql.query("SELECT * FROM revoked_tokens WHERE (iat = ? AND user_id = ?)", [iat, user_id], (err, res) => {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        } else if (res.length) {
            console.log("Token found: ", res[0]);
            result(null, res[0]);
            return;
          }
          // not found User with the id
          result({ kind: "token not_found" }, null);
    });
}

module.exports = RevokedToken