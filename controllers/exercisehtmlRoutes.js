//Dependencies
const express = require("express");

const mongojs = require("mongojs");

const logger = require("morgan");

let path = require("path")

let router = express.Router()

//==================== GET API'S =================================
//Main index page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname  + "./public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname  + "./public/stats.html"));
});

module.exports = router;