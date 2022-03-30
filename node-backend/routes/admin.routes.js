const express = require('express');


const adminRoute = express.Router();
let Admin = require('../model/Admin');

// Add admin
adminRoute.route('/add-admin').post((req, res, next) => {
    Admin.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get all admin
adminRoute.route('/admins').get((req, res, next) => {
    Admin.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get admin
adminRoute.route('/admins/:id').get((req, res, next) => {
    Admin.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Delete admin
adminRoute.route('/delete-admin/:id').delete((req, res, next) => {
    Admin.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = adminRoute;