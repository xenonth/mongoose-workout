//Package dependencies
const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path")

//TODO's
/*Connect program to mongoAtlas online
Once connected create models to connect and insert into the database collection
Once done use the api's to change and update the workout's as well as being able to create their own.
*/

//Module imports
const app = express()

const router = require("./controllers/exercisehtmlRoutes.js")

app.use(express.static(path.join(__dirname + '/public')));


const PORT = process.env.PORT || 3001;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });