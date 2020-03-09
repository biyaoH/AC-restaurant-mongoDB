const mongoose = require('mongoose')
const restaurantData = require('../../restaurant.json')
const userData = require('../user.json')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
  const { restaurantList } = restaurantData
  const { userList } = userData
  // console.log(results)
  userList.forEach(user => User.create(user))
  // results.forEach(result => Restaurant.create(result))

  User.findOne({ email: 'user1@example.com' })
    .then(user => {
      if (user) {
        for (let i = 0; i < 3; i++) {
          // console.log(user)
          restaurantList[i].userId = user._id
          Restaurant.create(restaurantList[i])
        }
      }

    })

  User.findOne({ email: 'user2@example.com' })
    .then(user => {
      for (let i = 2; i < 6; i++) {
        restaurantList[i].userId = user._id
        Restaurant.create(restaurantList[i])
      }
    })

  console.log('done')
})
