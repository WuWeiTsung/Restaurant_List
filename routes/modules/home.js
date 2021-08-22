const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const restaurantList = require('../../restaurant.json')

// index page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurant, keyword: keyword })
})


module.exports = router