/*
*  Mongoose schema for users
* */

const mongoose = require('mongoose');

// Client Schema
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);