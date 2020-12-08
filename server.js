//Package dependencies
const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path")


//Module imports
const app = express()


app.use(express.static(path.join(__dirname + '/public')));

const router = require("./controllers/exercisehtmlRoutes.js")



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