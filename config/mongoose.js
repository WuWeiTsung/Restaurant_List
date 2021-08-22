const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })


//connect mongoDB
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB Error')
})

db.once('open', () => {
  console.log('mongoDB connected')
})

module.exports = db