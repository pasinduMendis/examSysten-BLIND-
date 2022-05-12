const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
//const multer = require('multer')

const mongoose = require('mongoose')
const config = require('./dataBase.js')
const studentRoutes = require('./routes/studentRoutes')
const adminRoutes = require('./routes/adminRoutes')
const routerUpload = require('./routes/fileUploadRoutes')
const routerExam = require('./routes/examRoutes')
const routerQuestion = require('./routes/questionRoutes')
const routerQuestionUpload = require('./routes/examUploadRotes')
const resultRoutes=require('./routes/resultsRoute')

mongoose.Promise = global.Promise
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log('Database is successfully connected')
    },
    (err) => {
      console.log('cannont connect to the database' + err)
    }
  )

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/student', studentRoutes)
app.use('/admin', adminRoutes)
app.use('/api', routerUpload)
app.use('/api2', routerQuestionUpload)
app.use('/exam', routerExam)
app.use('/question', routerQuestion)
app.use('/result',resultRoutes)

app.use('/Auploads', express.static(path.join(__dirname, 'ExamUploads')))
app.use('/Iuploads', express.static(path.join(__dirname, 'uploads')))

app.use(fileUpload())

app.listen(PORT, function () {
  console.log('saver is running on :', PORT)
})
