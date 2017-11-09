import HomePage from './HomePage'
import renderReactPage from '../lib/renderReactPage'

export default function getHome(req, res) {
  renderReactPage(res, {
    PageComponent: HomePage,
    templateData: {
      title: req.query.title,
      clientScript: 'home.js'
    }
  })
}
