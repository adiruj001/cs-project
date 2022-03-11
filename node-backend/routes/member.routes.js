const express = require('express');


const memberRoute = express.Router();
let Member = require('../model/Member');

// Add member
memberRoute.route('/signup-page').post((req, res, next) => {
    Member.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get all member
memberRoute.route('/members').get((req, res, next) => {
    Member.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get member
memberRoute.route('/members/:id').get((req, res, next) => {
    Member.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Delete member
memberRoute.route('/delete-member/:id').delete((req, res, next) => {
    Member.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = memberRoute;