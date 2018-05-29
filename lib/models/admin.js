/*
* Mongoose schema for admin rolls
* */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let AdminSchema = mongoose.Schema({
    adminFirstName: {
        type: String,
        required: false
    },
    adminLastName: {
        type: String,
        required: true
    },
    adminUsername: {
        type: String,
        index: true,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    }
});

let Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = (newAdmin, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.adminPassword, salt, (err, hash) => {
            newAdmin.adminPassword = hash;
            newAdmin.save(callback);
        });
    });
};