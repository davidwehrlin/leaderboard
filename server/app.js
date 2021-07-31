/**
 * @fileoverview Main entry point of the leaderboard api. Uses express to stand
 * up a server which routes HTTP requests for API.              
 * @dependencies dotenv: for accessing environment variables,
 * express: for standing up server and setting up routes,
 * mainRouter: for routing API requests
 */
require('dotenv').config()
var mongoose = require('mongoose');
const express = require('express')
const mainRouter = require('./routes/main-router')
var cors = require("cors");

// Connecting to the MongoDB server
var uri = process.env.DB_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database...")
});

// Begin building express app
const app = express()
app.use(express.json())
app.use(cors());

// Add main api router
app.use('/api/leaderboard', mainRouter)

// Begin listening on specified port
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})