import HomePage from './HomePage'
import renderReactPage from '../lib/renderReactPage'

export default function getHome(req, res) {
  renderReactPage(res, {
    PageComponent: HomePage,
    clientScript: 'home.js',
    templateData: {
      title: req.query.title
    }
  })
}
