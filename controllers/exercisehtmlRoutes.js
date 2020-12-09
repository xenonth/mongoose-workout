//Dependencies
const express = require("express");

const mongojs = require("mongojs");

const logger = require("morgan");

let path = require("path")

let router = express.Router()

//==================== GET API'S =================================
//Main index page
router.get("/", (req, res) => {
    res.render("../public/index.html");
});

router.get("/exercise.html", (req, res) => {
    res.render("../public/exercise.html");
});

router.get("/stats.html", (req, res) => {
    res.render("../public/stats.html");
});


//POST API's



module.exports = router;