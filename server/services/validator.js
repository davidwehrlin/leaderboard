/**
 * @fileoverview Input validator and sanitizer for all API endpoints which 
 * hold body, param, and/or query data.
 * @dependencies express-validator: for input validation and sanitation
 */

const { body, param, query, validationResult } = require('express-validator');

module.exports.validateCreate = [
    body('name').trim().isAlphanumeric(),
    body('score').trim().isNumeric(),
    body('date').trim().isDate()
]

module.exports.validateRead = [
    query('name').optional().isAlphanumeric(),
    query('top').optional().isInt({gt: 0})
]

module.exports.validateUpdate = [ 
    param('id').isAlphanumeric(),
    query('name').optional().isAlphanumeric(),
    query('date').optional().isDate()
]

module.exports.validateDelete = [ 
    param('id').isAlphanumeric()
]

module.exports.getValidationResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    } else {
        next()
    }
}