const express = require('express');


const contactRoute = express.Router();
let Contact = require('../model/Contact');

// Add contact
contactRoute.route('/contact-page').post((req, res, next) => {
    Contact.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get all contact
contactRoute.route('/contacts').get((req, res, next) => {
    Contact.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get contact
contactRoute.route('/contacts/:id').get((req, res, next) => {
    Contact.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Delete member
contactRoute.route('/delete-contact/:id').delete((req, res, next) => {
    Contact.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = contactRoute;