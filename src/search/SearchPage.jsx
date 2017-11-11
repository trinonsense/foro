import React from 'react'
import ResultCard from './ResultCard'
import MakeModelForm from './MakeModelForm'
import YearForm from './YearForm'
import PriceForm from './PriceForm'
import request from 'superagent'
import SearchResults from './SearchResults'
import qs from 'query-string'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <MakeModelForm
              make={this.props.query.make}
              model={this.props.query.model}
            />

            <PriceForm
              min={this.props.query.price_min}
              max={this.props.query.price_max}
            />

            <YearForm />

            <label>Condition:</label><br/>
            <label>New
              <input value="new" name="condition[]" type="checkbox"/>
            </label><br/>
            <label>Used
              <input value="used" name="condition[]" type="checkbox"/>
            </label><br/>
            <label>Certified Pre-owned
              <input value="certified pre-owned" name="condition[]" type="checkbox"/>
            </label><br/>

            <button type="submit" disabled={this.state.isSearching}>
              {this.state.isSearching ? 'Loading...' : 'Search'}
            </button>
          </form>
        </div>

        <SearchResults
          results={this.state.results}
          onClickResult={this.showResult}
        />

        <ResultCard result={this.state.resultDetail} />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.showResult = this.showResult.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      page: 1,
      resultDetail: null,
      isSearching: false,
      results: []
    }
  }

  componentDidMount() {
    this.getResults(this.props.query)
  }

  getResults(data) {
    this.setState({isSearching: true})

    request
      .get('https://autolist-test.herokuapp.com/search')
      .query(data)
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          page: 1,
          resultDetail: null,
          isSearching: false,
          results: res.body.records
        })
      })
  }

  onSubmit(e) {
    e.preventDefault()
    const data = getFormData(e.target)
    const url = window.location.origin + window.location.pathname + '?' + qs.stringify(data)
    window.history.replaceState(null, null, url)
    this.getResults(data)
  }

  showResult({target}) {
    const resultDetail = this.state.results.find(r => r.id.toString() === target.dataset.id)
    this.setState({resultDetail})
  }
}

function getFormData(form) {
  const data = {}
  const formData = new FormData(form)
  formData.forEach((val, field) => { data[field] = val })

  return data
}
