const express = require('express');
const app = express();

const reservationRoute = express.Router();
let Reservation = require('../model/Reservation');

// Add reservation
reservationRoute.route('/homepage').post((req, res, next) => {
    Reservation.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get all reservation
reservationRoute.route('/reservations').get((req, res, next) => {
    Reservation.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get reservation
reservationRoute.route('/reservations/:id').get((req, res, next) => {
    Reservation.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})


// Delete reservation
reservationRoute.route('/delete-reservation/:id').delete((req, res, next) => {
    Reservation.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = reservationRoute;