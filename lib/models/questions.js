let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
    question1: {
        type: String,
    },
    question2: {
        type: String,
    },
    question3: {
        type: String,
    },
    question4: {
        type: String,
    },
    question5: {
        type: String,
    },
    question6: {
        type: String,
    },
    question7: {
        type: String,
    },
    date: {
        type: String,
    },
});

let Question = module.exports = mongoose.model('Question', QuestionSchema);