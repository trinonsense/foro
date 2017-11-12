import express from 'express'
import mustacheExpress from 'mustache-express'
import getHome from './home/getHome'
import getSearch from './search/getSearch'
import getVehicle from './vehicle/getVehicle'
import compression from 'compression'
import morgan from 'morgan'
const app = express()

app.use(morgan('dev'))
app.use(compression())
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './src/views')

app.get('/', getHome)
app.get('/search', getSearch)
app.get('/vehicle/:vin', getVehicle)

app.listen(8000, () => console.log('🕺 The server is ready to party 🕺'))
