const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        minlength: 200,
    },
    tags: {
        type: Array,
        required: true,
    },

    votes: {
        type: Number,
        default: 0,
    },
    
    author: {
        type: String,
        required: true,
    },

    comments: [{body: String, user: String}],

    answerList: [{body: String, user: String, votes: Number}],

    

    
});

const question = mongoose.model('question', questionSchema);

module.exports = question;