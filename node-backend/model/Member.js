const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Member = new Schema({
    member_username: {
        type: String
    },
    member_password: {
        type: String
    },
    member_firstname: {
        type: String
    },
    member_lastname: {
        type: String
    },
    member_tel: {
        type: String
    },
    type: {
        type: String
    }
}, {
    collection: 'member'
})

module.exports = mongoose.model('Member', Member);