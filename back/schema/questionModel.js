const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  question_no: Number,
  question: String,
  answerA: String,
  answerB: String,
  answerC: String,
  answerD: String,
  exam_name: String,
  correct_answer:String,
  type:String,
})

module.exports = mongoose.model('Question', questionSchema)
