const express = require('express')
//const alert = require('alert')

const questionRoutes = express.Router()
const cors = require('cors')
//const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const Exam = require('../schema/examModel')
const Question = require('../schema/questionModel')

questionRoutes.post('/add', async (req, res) => {
  const question = new Question(req.body)
  var name = question.exam_name
  //var qNum = question.question_no

  const check = await Exam.findOne({
    exam_name: decodeURI(name),
  })

  if (check != null) {
    question
      .save()
      .then((result) => {
        console.log(result)
        res.send('successfully added ')
      })
      .catch((err) => {
        console.log(err)
        res.send('failed')
      })
  } else {
    res.json('invalid exam name')
  }
})

questionRoutes.get('/', async (req, res) => {
  const question = await Question.find()
  res.send(question)
})

questionRoutes.delete('/delete/:id', async (req, res) => {
  const delId = await Question.findByIdAndDelete({ _id: req.params.id })
  res.json(delId)
})

questionRoutes.get('/get/:id', async (req, res) => {
  const findId = await Question.findById({ _id: req.params.id })
  res.json(findId)
})

questionRoutes.get('/get/:name', async (req, res) => {
  const findId = await Question.findOne({ exam_name: req.params.name })

  res.json(findId)
})

questionRoutes.get('/check/:type/:id', async (req, res) => {
  const findId = await Question.find({ exam_name: decodeURI(req.params.id),
    type: decodeURI(req.params.type) })
  res.json(findId.length>0?findId:'unavailable')
})

questionRoutes.get('/check5/:id', async (req, res) => {
  const findId = await Question.find({ exam_name: decodeURI(req.params.id) })
  res.json(findId.length>0?findId:'unavailable')
})

questionRoutes.put('/update/:type/:id/:name', async (req, res) => {
  const updateId = await Question.updateOne(
    {
      question_no: req.params.id,
      exam_name: req.params.name,
      type:req.params.type
    },
    { $set: req.body }
  )
  res.send(updateId)
})

module.exports = questionRoutes
