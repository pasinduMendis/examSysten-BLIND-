const express = require('express')
//const alert = require('alert')

const examRoutes = express.Router()
const cors = require('cors')
//const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const Exam = require('../schema/examModel')
const Admin = require('../schema/adminModel')

process.env.SECRET_KEY = 'secret'

examRoutes.post('/add', async (req, res) => {
  const exam = new Exam(req.body)
  const check = await Admin.findOne({ admin_id: exam.instructer_id })
  const check2 = await Exam.findOne({ exam_name: exam.exam_name })
  if (check != null && check2 == null) {
    exam
      .save()
      .then((result) => {
        console.log(result)
        res.send('successfully added exam')
      })
      .catch((err) => {
        console.log(err)
        res.send('failed')
      })
  } else {
    res.json(
      'faild. /n cannot add exams Same name. /n please enter valid instructer id '
    )
  }
})

examRoutes.get('/', async (req, res) => {
  const exam = await Exam.find()
  res.send(exam)
})

examRoutes.put('/update/:id', async (req, res) => {
  const updateId = await Exam.updateOne(
    { exam_name: req.params.id },
    { $set: req.body }
  )
  res.json(updateId)
})

examRoutes.delete('/delete/:id', async (req, res) => {
  const delId = await Exam.findByIdAndDelete({ _id: req.params.id })
  res.json(delId)
})

examRoutes.get('/get/:id', async (req, res) => {
  const findId = await Exam.findById({ _id: req.params.id })
  res.json(findId)
})

examRoutes.get('/check/:id', async (req, res) => {
  const findId = await Exam.findOne({ exam_name: req.params.id })
  res.send(findId)
})

module.exports = examRoutes
