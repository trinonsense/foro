import HomePage from './HomePage'
import renderReactPage from '../lib/renderReactPage'
import makes from '../data/makes'

export default function getHome(req, res) {
  renderReactPage(res, {
    PageComponent: HomePage,
    clientScript: 'home.js',
    reactData: {makes},
    templateData: {
      title: req.query.title
    }
  })
}
