import renderReactPage from '../lib/renderReactPage'
import SearchPage from './SearchPage'

export default function getSearch(req, res, next) {
  renderReactPage(res, next, {
    PageComponent: SearchPage,
    clientScript: 'search.js',
    reactData: {query: req.query},
    templateData: {
      title: req.query.make ? `Searching: ${req.query.make} ${req.query.model} // FORO` : 'Search All Cars // FORO'
    }
  })
}
