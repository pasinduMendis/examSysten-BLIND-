const mongoose = require('mongoose')

const studentResultSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  student_id: String,
  givenAnswers: [],
  marks: String,
  subject:String,
})

module.exports = mongoose.model('StudentResult', studentResultSchema)