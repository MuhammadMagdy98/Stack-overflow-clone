const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    minlength: 50,
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

  createdAt: {
    type: String
  },

  viewsList: [{ip: String}],

  comments: [{ body: String, user: String, id: Number, createdAt: String }],

  answerList: [
    {
      body: String,
      votes: Number,
      author: String,
      createdAt: String,
      comments: [{ body: String, user: String, id: Number, createdAt: String }],
    },
  ],
});

const question = mongoose.model("question", questionSchema);

module.exports = question;
