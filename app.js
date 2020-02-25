const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })

})

app.get('/restaurants', (req, res) => {
  return res.redirect('/')
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('detail', { restaurant: restaurant })
    })
})

app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
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