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
  res.send('home page')
})

app.get('/restaurants', (req, res) => {
  res.send('show all Restaurant')
})

app.get('/restaurants/new', (req, res) => {
  res.send('create new Restaurant')
})

app.get('/restaurants/:id', (req, res) => {
  res.send('show Restaurant detail')
})

app.post('/restaurants', (req, res) => {
  res.send('create Restaurant')
})

app.get('/restaurants/:id/edit', (req, res) => {
  res.send('edit Restaurant page')
})

app.post('/restaurants/:id/edit', (req, res) => {
  res.send('edit Restaurant')
})

app.post('/restaurants/:id/delete', (req, res) => {
  res.send('delete Restaurant')
})

app.listen(port, () => {
  console.log('App restaurant MongoDB is runing')
})