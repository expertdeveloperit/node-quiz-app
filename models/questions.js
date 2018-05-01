// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Quiz Schema
const QuestionSchema = new Schema({
    question: {
	   type: String,
	   required: true
	  },
    options: [
	   {
	  	   type: String,
	       required: true
	   }
    ],
    answer: {
       type: Number,
       required: true
      }
});

module.exports = mongoose.model('Question', QuestionSchema)
