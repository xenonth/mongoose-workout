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


// ====================== API's for stats.html ==========
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get('/api/workouts/range', (req, res) => {
    //target API data range,
    
        //using aggregate to send data
        Workout.aggregate([
            {
                $addFields: {
                    //adding total pounds field
                    //adding total workout time of activities
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                    //Need to add workouts to each other somehow?
                },    
                    //totalWorkouts: {}
            },    
        
        ]).sort({_id: -1})
        .limit(5)
         .then((data) => {
             console.log(data)
             res.json(data);
         })
     .catch ((error) =>{
        res.sendStatus(404).send();
    })
})

//Does it need to work in tandem?
router.post("/api/workouts/range", (req, res) => {
    Workout.updateMany({})
        .then((updatedData) => {
            res.json(updatedData)
        }) .catch(() =>{ 
            res.sendStatus(404);
        })
})






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
        res.sendStatus(404).send();
    }
    });


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

// delete route
router.delete('/api/workouts/', ({ body }, res) => {
    //takes the body route and deletes targeted exercise based on type
    
    Workout.findByIdAndDelete(body.id)
    .then(res.send("Successfully Deleted!"))
    .catch((error)  => {
        console.log(error)
        res.sendStatus(404).send();
    });
    
})

module.exports = router;