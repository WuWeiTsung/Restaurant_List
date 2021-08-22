const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

//handlebars
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')


const restaurantList = require('./restaurant.json')

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//connect mongoDB
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB Error')
})

db.once('open', () => {
  console.log('mongoDB connected')
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



// //搜尋功能(name or category)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurant, keyword: keyword })
})

app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})