import renderReactPage from '../lib/renderReactPage'
import SearchPage from './SearchPage'
import request from 'superagent'

export default function getSearch(req, res) {
  request
    .get('https://autolist-test.herokuapp.com/search')
    .query({
      price_min: req.query.price_min,
      price_max: req.query.price_max
    })
    .end((err, response) => {
      if (err) return console.error(err)

      let results = response.body.records

      if (req.query.make) {
        results = results.filter(result => {
          const makeTest = result.make.toLowerCase() === req.query.make.toLowerCase()
          const modelTest = modelPredicate(result.model, req.query.model)
          return makeTest && modelTest
        })
      }

      renderReactPage(res, {
        PageComponent: SearchPage,
        clientScript: 'search.js',
        reactData: {results},
        templateData: {
          title: req.query.make ? `Searching: ${req.query.make} ${req.query.model}` : 'Search All Cars'
        }
      })
    })
}

function modelPredicate(result, query) {
  if (query) {
    return result.toLowerCase() === query.toLowerCase()

  } else {
    return true
  }
}
