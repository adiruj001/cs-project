const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Admin = new Schema({
    admin_username: {
        type: String
    },
    admin_password: {
        type: String
    },
    type: {
        type: String
    }
}, {
    collection: 'admin'
})

module.exports = mongoose.model('Admin', Admin);