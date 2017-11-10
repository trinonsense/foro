import express from 'express'
import mustacheExpress from 'mustache-express'
import getHome from './home/getHome'
import getSearch from './search/getSearch'
const app = express()

app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './src/views')

app.get('/', getHome)
app.get('/search', getSearch)

app.listen(8000, () => console.log('🕺 The server is ready to party 🕺'))
