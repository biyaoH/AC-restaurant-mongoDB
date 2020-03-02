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

app.use('/', require('./routes/home.js'))
//當路徑是/restaurants的時間執行後面的callback函數
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/user', require('./routes/user.js'))


mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })



const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Restaurant = require('./models/restaurant')



app.listen(port, () => {
  console.log('App restaurant MongoDB is runing')
})