import React from 'react'
import ResultPreview from './ResultPreview'
import SearchFilters from './SearchFilters'
import request from 'superagent'
import SearchResults from './SearchResults'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <div>
        <SearchFilters query={this.props.query} />

        <div>
          <SearchResults
            results={this.state.results}
            onClickResult={this.selectResult}
          />

          {this.state.isSearching ?
            <div className="searching-overlay"></div>
          : null}
        </div>

        <div>
          <ResultPreview result={this.state.selectedResult} />

          {this.state.isFetchingVehicle ?
            <div className="fetching-overlay"></div>
          : null}
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.selectResult = this.selectResult.bind(this)

    this.state = {
      page: 1,
      selectedResult: null,
      isFetchingVehicle: false,
      isSearching: false,
      results: []
    }
  }

  componentDidMount() {
    this.search(this.props.query)
  }

  search(query) {
    this.setState({isSearching: true})
    request
      .get('https://autolist-test.herokuapp.com/search')
      .query(query)
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          page: 1,
          selectedResult: null,
          isSearching: false,
          results: res.body.records
        })
      })
  }

  selectResult(vin) {
    this.setState({isFetchingVehicle: true})
    request
      .get('/vehicle/' + vin)
      .accept('json')
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          isFetchingVehicle: false,
          selectedResult: res.body
        })
      })
  }
}
