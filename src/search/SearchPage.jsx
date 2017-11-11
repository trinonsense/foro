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
            {result.make} / {result.model} / {result.trim}
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

    this.state = {
      page: 1,
      resultDetail: null,
      isSearching: false,
      results: this.props.results
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({isSearching: true})

    request
      .get('https://autolist-test.herokuapp.com/search')
      .query(getFormData(e.target))
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          page: 1,
          isSearching: false,
          results: res.body.records
        })
      })
  }

  showResult({target}) {
    const resultDetail = this.props.results.find(r => r.id.toString() === target.dataset.id)
    this.setState({resultDetail})
  }
}

function getFormData(form) {
  const data = {}
  const formData = new FormData(form)
  formData.forEach((val, field) => { data[field] = val })

  return data
}
