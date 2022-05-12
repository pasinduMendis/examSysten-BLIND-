const express = require('express')
//const alert = require('alert')

const resultRoutes = express.Router()
const cors = require('cors')
const Result = require('../schema/studentResuts')

resultRoutes.post('/add', async (req, res) => {
  const result = new Result(req.body)
  
  result
      .save()
      .then((result) => {
        console.log(result)
        res.send('successfully added')
      })
      .catch((err) => {
        console.log(err)
        res.send('failed')
      })
})

resultRoutes.get('/get/:id', async (req, res) => {
  const findId = await Result.find({student_id: req.params.id })
  console.log(findId)
  res.send(findId?findId:'noId')
})



module.exports = resultRoutes
