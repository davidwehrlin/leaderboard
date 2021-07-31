/**
 * @fileoverview Mongoose model controller for extracting data from MongoDB.
 * Uses CRUD method for extracting data.              
 * @dependencies Requires the leaderboard 'Entry' mongoose model
 * @methods create, read, update, delete
 */
const Entry = require('../models/entry')

module.exports.create = async (req, res, next) => {
    const entry = new Entry({
        name:   req.body.name,
        score:  req.body.score,
        date:   req.body.date
    })
    var dbEntry = await entry.save().catch(next)
    return res.json(dbEntry)
}

module.exports.read = async (req, res, next) => {
    var entries = req.query.name ? 
        Entry.find({name: req.query.name}) : 
        Entry.find()
    entries = entries.sort({score: -1})
    entries = req.query.top ?
        await entries.limit(Number.parseInt(req.query.top)).catch(next) :
        await entries.limit(5).catch(next)
    return res.json(entries)
}

module.exports.update = async (req, res, next) => {
    const entry = await Entry.findById(req.params.id).catch(next)
    if (req.query.name) entry.name = req.query.name
    if (req.query.date) entry.date = req.query.date
    var dbEntry = await entry.save().catch(next)
    return res.json(dbEntry)
}

module.exports.delete = async (req, res, next) => {
    var dbEntry = await Entry.findByIdAndDelete(req.params.id).catch(next)
    return res.json(dbEntry)
}