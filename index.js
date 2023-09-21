if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const User = require('./src/repository/mongodb')
const SERVER = require('./src/server/index')
const initializePassport = require('./src/services/passport-config')

const app = express()
app.use(SERVER)


initializePassport(
  passport,
  email => User.findOne({ email: email }),
  id => User.findById(id)
)

app.listen(3000,(console.log(11111)))