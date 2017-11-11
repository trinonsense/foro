import React from 'react'
import ResultCard from './ResultCard'
import SearchFilters from './SearchFilters'
import request from 'superagent'
import SearchResults from './SearchResults'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <div>
        <SearchFilters query={this.props.query} />

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

  }
  showResult({target}) {
    const resultDetail = this.state.results.find(r => r.id.toString() === target.dataset.id)
    this.setState({resultDetail})
  }
}

}
