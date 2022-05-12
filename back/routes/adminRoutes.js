const express = require('express')
//const alert = require('alert')
const adminRoutes = express.Router()
const bcrypt = require('bcrypt')
//const cors = require('cors')
const jwt = require('jsonwebtoken')
const Admin = require('../schema/adminModel')

//process.env.SECRET_KEY = 'secret'

adminRoutes.post('/add', async (req, res) => {
  const admin = new Admin(req.body)

  const check = await Admin.findOne({ admin_email: admin.admin_email })
  if (check == null) {
    const salt = await bcrypt.genSalt(10)
    admin.admin_password = await bcrypt.hash(admin.admin_password, salt)
    admin
      .save()
      .then((result) => {
        console.log(result)
        res.json('successfully registered admin')
      })
      .catch((err) => console.log(err))
  } else {
    res.json('already registered')
  }
})

adminRoutes.get('/', async (req, res) => {
  const admin = await Admin.find()
  res.json(admin)
})

adminRoutes.put('/update/:id', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(req.body.admin_password, salt)
    const password={admin_password:pass} 
/*     console.log(req.body) */
  const updateId = await Admin.updateOne(
    { admin_id: req.params.id },
    { $set: password }
  )
  res.send(updateId?'success':'failed')
})

adminRoutes.put('/update2/:id', async (req, res) => {
/*     console.log(req.body) */
  const updateId = await Admin.updateOne(
    { admin_id: req.params.id },
    { $set: req.body }
  )
  res.send(updateId?'success':'failed')
})

adminRoutes.delete('/delete/:id', async (req, res) => {
  const delId = await Admin.findByIdAndDelete({ _id: req.params.id })
  res.json(delId)
})

adminRoutes.get('/get/:id', async (req, res) => {
  const findId = await Admin.findOne({ admin_id: req.params.id })
  res.send(findId)
})

adminRoutes.get('/check/:email/:password', async (req, res) => {
  const findId = await Admin.findOne({
    admin_email: req.params.email,
    //admin_password: req.params.password,
  })
  const validPassword = await bcrypt.compare(
    req.params.password,
    findId.admin_password
  )
  if (validPassword) {
    res.send('done')
  } else {
    res.send('incorrect')
  }
})

adminRoutes.get('/check2/:email', async (req, res) => {
  const findId = await Admin.findOne({
    admin_email: req.params.email,
    //admin_password: req.params.password,
  })

  res.send(findId)
})

module.exports = adminRoutes
