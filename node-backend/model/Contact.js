const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    contact_member_id: {
        type: String
    },
    contact_member_name: {
        type: String
    },
    contact_member_email: {
        type: String
    },
    contact_member_tel: {
        type: Number
    },
    contact_massage: {
        type: String
    },
}, {
    collection: 'contact'
})

module.exports = mongoose.model('Contact', Contact);