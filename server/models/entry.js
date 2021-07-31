/**
 * @fileoverview Leaderboard entry mongoose model for MongoDB database
 * manipulation              
 * @dependencies mongoose: for creating schema and building model
 * @properties name(String), score(Number), date(Date)
 */
const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: true
    }
  });
module.exports = mongoose.model("Entry", entrySchema)