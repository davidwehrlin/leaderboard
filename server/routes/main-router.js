/**
 * @fileoverview API router for main leaderboard API endpoints. Allows CRUD
 * manipulation of the MongoDB database.
 * @dependencies express: for base routing code,
 * validator: for validating post input.
 * controller: for database access via CRUD operations
 * @routes post('/'), get('/'), patch('/:id'), delete('/:id')
 */
const express = require('express')
const validator = require("../services/validator")
const controller = require('../services/controller')

const router = express.Router()

// CREATE
router.post('/',
    validator.validateCreate,
    validator.getValidationResult, 
    controller.create)

// READ
router.get('/',
    validator.validateRead,
    validator.getValidationResult, 
    controller.read)

// UPDATE
router.patch('/:id', 
    validator.validateUpdate,
    validator.getValidationResult, 
    controller.update)

// DELETE
router.delete('/:id', 
    validator.validateDelete,
    validator.getValidationResult, 
    controller.delete)

module.exports = router