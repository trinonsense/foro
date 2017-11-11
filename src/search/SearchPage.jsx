import React from 'react'
import ResultCard from './ResultCard'
import MakeModelForm from './MakeModelForm'
import PriceForm from './PriceForm'
import request from 'superagent'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <MakeModelForm
              makes={this.props.makes}
              make={this.props.query.make}
              model={this.props.query.model}
            />

            <PriceForm
              min={this.props.query.price_min}
              max={this.props.query.price_max}
            />

            <button type="submit">
              {this.state.isSearching ? 'Loading...' : 'Search'}
            </button>
          </form>
        </div>

        {this.state.results.map(result =>
          <div onClick={this.showResult} data-id={result.id} key={result.id}>
            {result.make} {result.model}
          </div>
        )}

        <ResultCard result={this.state.resultDetail} />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.showResult = this.showResult.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    const {query} = this.props
    this.state = {
      page: 1,
      resultDetail: null,
      priceMin: this.props.query.price_min,
      priceMax: this.props.query.price_max,
      isSearching: false,
      results: this.filterResults(query.make, query.model, this.props.results),
      rawResults: this.props.results
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const data = {}
    for (let field of new FormData(e.target)) {
      data[field[0]] = field[1] || null
    }

    this.setState({isSearching: true})

    request
      .get('https://autolist-test.herokuapp.com/search')
      .query({
        limit: 50,
        price_min: data.price_min,
        price_max: data.price_max
      })
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          page: 1,
          isSearching: false,
          rawResults: res.body.records,
          results: this.filterResults(data.make, data.model, res.body.records)
        })
      })
  }

  filterResults(make, model, results) {
    if (!make) return results

    return results.filter(result => {
      const makeTest = result.make.toLowerCase() === make.toLowerCase()
      const modelTest = modelPredicate(result.model, model)
      return makeTest && modelTest
    })
  }

  showResult({target}) {
    const resultDetail = this.props.results.find(r => r.id.toString() === target.dataset.id)
    this.setState({resultDetail})
  }
}

function modelPredicate(result, query) {
  if (query) {
    return result.toLowerCase() === query.toLowerCase()
  } else {
    return true
  }
}
