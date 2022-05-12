const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  admin_name: String,
  admin_email: String,
  admin_id: String,
  admin_password: String,
  photoName: String,
})

module.exports = mongoose.model('Admin', adminSchema)
