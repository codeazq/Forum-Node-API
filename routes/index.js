const express = require('express');
const router = express.Router();
const sql = require('../models/db.js')

router.get('/', function(req, res) {
    res.send("Index");
});


module.exports = router;