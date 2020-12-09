//Dependencies
const express = require("express");

const mongojs = require("mongojs");

const logger = require("morgan");

let path = require("path")

let router = express.Router()

//==================== GET API'S =================================
//Main index page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "stats.html"));
});


//POST API's
//for post request for stats.js looking for information about a workout routine and workout burns
router.put("/api/workouts/:id"), (req, res) => {
    let id = req.params.id

    //Query using id
    //refer to mongo documentation for query call
    .then(data)
    res.json(data)
}

router.post("/api/workouts", (req, res) => {
    res.json(data)
})

router.post("/api/workouts/range", (req, res) => {
    res.json(data)
})


module.exports = router;