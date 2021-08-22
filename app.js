const express = require('express')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')

require('./config/mongoose')

//handlebars
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')



//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})