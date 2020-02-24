const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3000

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Restaurant = require('./models/restaurant')

app.get('/', (req, res) => {
  res.send('Restaurant MongoDB')
})

app.listen(port, () => {
  console.log('App restaurant MongoDB is runing')
})