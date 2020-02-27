const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  // console.log(req.query.value)
  const dropdown = req.query.value

  if (dropdown === 'az') {
    Restaurant.find()
      .sort({ name: 'asc' })
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  } else if (dropdown === 'za') {
    Restaurant.find()
      .sort({ name: 'desc' })
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  } else {

    Restaurant.find()
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }



})

module.exports = router