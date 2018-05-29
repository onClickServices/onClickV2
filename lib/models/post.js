/*
*  Mongoose schema for post
* */

const mongoose = require('mongoose');

// Client Schema
let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    urlAddress: {
        type: String,
        required: false
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

let Post = module.exports = mongoose.model('Post', userSchema);