const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  // console.log(req.query.value)
  const dropdown = req.query.value

  if (dropdown === 'az') {
    Restaurant.find({ userId: req.user._id })
      .sort({ name: 'asc' })
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  } else if (dropdown === 'za') {
    Restaurant.find({ userId: req.user._id })
      .sort({ name: 'desc' })
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  } else {

    Restaurant.find({ userId: req.user._id })
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }



})

module.exports = router