const express = require("express");
router = express.Router();

router.route('/').get((req, res)=>{
    res.status(200).json("Welcome to root URL of Server");
});

module.exports = router;