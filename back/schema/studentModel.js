const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  student_name: String,
  student_email: String,
  student_id: String,
  photoName: String,
  mobile:String,
  address:String,
  googleDrive:String,
  photoPath: String,
})

module.exports = mongoose.model('Student', studentSchema)
