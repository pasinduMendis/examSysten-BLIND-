let {PythonShell} = require('python-shell')


const express = require('express')
//const alert = require('alert')

const studentRoutes = express.Router()
const cors = require('cors')
//const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const Student = require('../schema/studentModel')

process.env.SECRET_KEY = 'secret'

studentRoutes.post('/add', async (req, res) => {
  const student = new Student(req.body)

  const check = await Student.findOne({ student_id: student.student_id })
  if (check == null) {
    student
      .save()
      .then((result) => {
        console.log(result)
        res.json('successfully registered student')
      })
      .catch((err) => console.log(err))
  } else {
    res.json('student already registered')
  }
})

studentRoutes.get('/', async (req, res) => {
  const student = await Student.find()
  res.json(student)
})

studentRoutes.put('/update/:id', async (req, res) => {
  const updateId = await Student.updateOne(
    { student_id: req.params.id },
    { $set: req.body }
  )
  res.send(updateId)
})

studentRoutes.delete('/delete/:id', async (req, res) => {
  const delId = await Student.findByIdAndDelete({ _id: req.params.id })
  res.json(delId)
})

studentRoutes.get('/faceRec', async (req, res) => {
  PythonShell.run('detect.py', null, async function (err, result) {
    if (err) throw err;
    console.log(result);
    //res.send(result[0])
    const findId = await Student.findOne({ student_id: result[0] })
    res.send(findId?result[0]:'')
  });
})

studentRoutes.get('/get/:id', async (req, res) => {
  const findId = await Student.findById({ _id: req.params.id })
  res.json(findId)
})

studentRoutes.get('/check/:id', async (req, res) => {
  const findId = await Student.findOne({ student_id: req.params.id })
  res.send(findId?findId:'')
})

module.exports = studentRoutes
