const { Schema } = require("mongoose");

//model to reflect a workout routine

//somehow insert into database will need to look into this information
const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
          }, exercises: Array 
            [{
                type: String,
                name: String,
                duration: Number,
                weight: Number,
                reps: Number,
                sets: Number,

          }]
    }
)

//command it to seed the database?
const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout;