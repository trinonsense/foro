import renderReactPage from '../lib/renderReactPage'
import SearchPage from './SearchPage'
import request from 'superagent'

export default function getSearch(req, res) {
  request
    .get('https://autolist-test.herokuapp.com/search')
    .query({
      make: req.query.make,
      model: req.query.model,
      price_min: req.query.price_min,
      price_max: req.query.price_max
    })
    .end((err, response) => {
      if (err) return console.error(err)

      renderReactPage(res, {
        PageComponent: SearchPage,
        clientScript: 'search.js',
        reactData: {
          query: req.query,
          results: response.body.records
        },
        templateData: {
          title: req.query.make ? `Searching: ${req.query.make} ${req.query.model}` : 'Search All Cars'
        }
      })
    })
}
