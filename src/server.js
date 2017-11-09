import express from 'express'
import mustacheExpress from 'mustache-express'
import getHome from './home/getHome'
const app = express()

app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './src/views')

app.get('/', getHome)

app.listen(8000, () => console.log('🕺 The server is ready to party 🕺'))
