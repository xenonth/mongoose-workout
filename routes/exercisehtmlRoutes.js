//Dependencies
const express = require("express");

const mongojs = require("mongojs");

const logger = require("morgan");

const mongoose = require ("mongoose")

const path = require("path")

const router = express.Router()

// accessing and connecting to the database
const Workout = require("../models/Workout.js")

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://owner:V0A9gD2VOncz9zGq@cluster0.oa5wy.mongodb.net/gymnasium?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

//==================== GET API'S INDEX PAGE=================================
//Main index page
router.get("/", (req, res) => {
    //Retrieving most recent exercise routine by date
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
        //Retrieving most recent exercise routine by date
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


// ====================== API's for exercise.html
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/stats/:", (req, res) => {
    Workout.find()
})


//POST API's
//for post request for stats.js looking for information about a workout routine and workout burns
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      // "runValidators" will ensure new exercises meet our schema requirements
      { new: true, runValidators: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
})


router.get('/api/workouts', (req, res) => {    
    try {
    Workout.aggregate([    
        {    $addFields: {    
            totalDuration: {    $sum: '$exercises.duration',    },    
        },    },    ])    
        .then((dbWorkouts) => {    
            res.json(dbWorkouts);    
        })    
        .catch((err) => {    
            res.json(err);    
        });
    } catch (error) {
        res.send(status(404));
    }
    });

router.post("/api/workouts/range", (req, res) => {
   
    res.json(data)
})

// retrieves data from the database 
router.get('/api/workouts/range', (req, res) => {
    //target API data range,
    try {
        //Returning five most recent workouts
        Workout.find({}).limit(5)
         .then((firstFive) => {
             res.json(firstFive);
         })
    } catch (error) {
        res.send(status(404));
    }

    //send response as JSON

    //get it to work and run it past trent or Dyon tomorrow
})

// delete route
router.delete('/api/workouts', (req, res) => {
    //takes the body route and deletes targeted exercise based on type
    let stretchType = req.body 
    Workout.findOneAndDelete({type: `exercise.${stretchType}`})
    .then(res.send("Successfully Deleted!"));
})

module.exports = router;