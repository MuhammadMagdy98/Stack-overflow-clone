const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    reputation: Number,
    isAdmin: Boolean,

    questionsList: [{url: String}],
    
    answersList: [{url: String}],

    tagsList: [],

    votesList: [{type: String}],

    
});

const users = mongoose.model('qa-users', userSchema);

module.exports = users;