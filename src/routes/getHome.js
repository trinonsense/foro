import HomePage from '../components/HomePage'
import renderReactPage from '../lib/renderReactPage'

export default function getHome(req, res) {
  renderReactPage(res, {
    PageComponent: HomePage,
    templateData: {
      title: req.query.title
    }
  })
}
