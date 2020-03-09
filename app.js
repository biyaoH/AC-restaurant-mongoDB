const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

app.use(session({
  secret: 'restaurant key',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

app.use(flash())

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()      // 辨識使用者是否已經登入的變數，讓 view 可以使用
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/', require('./routes/home.js'))
//當路徑是/restaurants的時間執行後面的callback函數
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths'))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port, () => {
  console.log('App restaurant MongoDB is runing')
})