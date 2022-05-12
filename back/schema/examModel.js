const mongoose = require('mongoose')

const examSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  exam_name: String,
  exam_date: String,
  exam_start: String,
  exam_end: String,
  instructer_id: String,
})

module.exports = mongoose.model('Exam', examSchema)
