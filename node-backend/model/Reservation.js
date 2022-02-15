const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Reservation = new Schema({
    member_id: {
        type: String
    },
    passenger: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    vanline: {
        type: String
    },
    pickup: {
        type: String
    },
    destination: {
        type: String
    },
    status: {
        type: String
    },
    amount: {
        type: Number
    }
}, {
    collection: 'reservation'
})

module.exports = mongoose.model('Reservation', Reservation);