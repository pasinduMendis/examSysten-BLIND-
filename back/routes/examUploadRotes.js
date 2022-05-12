const express = require('express')
const multer = require('multer')
//mongoose = require('mongoose')
//const { uuidv4 } = require('uuidv4')
const router = express.Router()

const DIR = './ExamUploads'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  },
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'audio/mpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only audio format allowed!'))
    }
  },
})

router.post('/user-profile', upload.single('file'), (req, res, next) => {})

/* router.get('/', (req, res, next) => {
  User.find().then((data) => {
    res.status(200).json({
      message: 'User list retrieved successfully!',
      users: data,
    })
  })
}) */

module.exports = router
