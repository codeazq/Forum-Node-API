const sql = require("../models/db");
const dbConfig = require("../config/db.config.js");
// const sql = require('../models/db');

module.exports.create = async function () {
    return new Promise((resolve, reject)=>{
        var rows = [ 
                        { 
                            name: 'Counter Top',
                            value: '4000',
                            description: 'The counter top',
                        },
                        {
                            name: 'Under Sink',
                            value: '6001',
                            description: 'Spot under the sink',
                        } 
                ];

        var query = `INSERT into mytable (name, value, description) VALUES ?`

        db.query(
            query,
            [rows.map(row => [row.name, row.value, row.description])],
            (error, results) => {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    resolve(results)
                }
            }
        );
        // var query = `INSERT into mytable SET ?;INSERT into mytable SET ?;`

        // sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        //     if (err) {
        //       console.log("error: ", err);
        //       reject(err);
        //     }
        //     console.log("created user: ", res);
        //     resolve({ id: res.insertId, ...newUser });
        // });
    });        
};