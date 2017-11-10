import React from 'react'
import ResultCard from './ResultCard'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <div>
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
    this.state = {
      page: 1,
      resultDetail: null,
      results: this.filterResults(this.props.results),
      rawResults: this.props.results
    }
  }

  filterResults(results) {
    const {query} = this.props
    if (!query.make) return results

    return results.filter(result => {
      const makeTest = result.make.toLowerCase() === query.make.toLowerCase()
      const modelTest = modelPredicate(result.model, query.model)
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
