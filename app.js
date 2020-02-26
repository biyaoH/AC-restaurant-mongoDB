const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

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
  console.log(req.params.id)
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant: restaurant })
    })
})

app.put('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.phone = req.body.phone
    restaurant.location = req.body.location
    restaurant.google_map = req.body.google_map
    restaurant.image = req.body.image
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)

    })
  })
})

app.delete('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.listen(port, () => {
  console.log('App restaurant MongoDB is runing')
})