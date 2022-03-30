const express = require('express');
//const app = express();

const reservationController = require('../controllers/images');

const reservationRoute = express.Router();

const storage = require('../helpers/storage');

let Reservation = require('../model/Reservation');

// Add reservation
reservationRoute.post('/paid-page', storage, reservationController.postReservation);

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

// Update reservation
reservationRoute.route('/update-reservation/:id').put((req, res, next) => {
    Reservation.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log("reservation updated successfully");
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