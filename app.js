const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('Restaurant MongoDB')
})

app.listen(port, () => {
  console.log('App restaurant MongoDB is runing')
})