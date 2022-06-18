const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        maxlength: 120,
        required: true,
    },

    numberOfAskedQuestions: {
        type: Number,
        default: 0
    },

});


const Tags = mongoose.model('tags', tagSchema);

module.exports = Tags; 


