import React from 'react'
import ResultPreview from './ResultPreview'
import SearchFilters from './SearchFilters'
import request from 'superagent'
import SearchResults from './SearchResults'
import styled from 'styled-components'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Filters visible={this.state.visibleFilters}>
          <Heading>FORO</Heading>
          <FilterPanelToggle className="pure-button" onClick={this.toggleFilters}>
            <Triangle left={this.state.visibleFilters} />
            <div className="copy">{this.state.visibleFilters ? 'Hide' : 'Show'} filters</div>
          </FilterPanelToggle>

          {this.state.visibleFilters ?
            <SearchFilters query={this.props.query} />
          : null}
        </Filters>

        <Results left={this.state.visibleFilters} right={this.state.visiblePreview}>
          <SearchResults
            results={this.state.results}
            onClickResult={this.previewResult}
          />

          {this.state.isSearching ?
            <SearchLoader>Searching Cars...</SearchLoader>
          : null}
        </Results>

        <Preview visible={this.state.visiblePreview}>
          <PreviewPanelToggle />
          <ResultPreview result={this.state.selectedResult} />

          {this.state.isFetchingVehicle ?
            <VehicleLoader>Loading Car</VehicleLoader>
          : null}
        </Preview>
      </Layout>
    )
  }

  constructor(props) {
    super(props)
    this.previewResult = this.previewResult.bind(this)
    this.toggleFilters = this.toggleFilters.bind(this)

    this.state = {
      page: 1,
      selectedResult: undefined,
      isFetchingVehicle: false,
      isSearching: true,
      visibleFilters: true,
      visiblePreview: false,
      results: []
    }
  }

  componentDidMount() {
    request
      .get('https://autolist-test.herokuapp.com/search')
      .query(this.props.query)
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          page: 1,
          isSearching: false,
          results: res.body.records
        })
      })
  }

  previewResult(vin) {
    if (this.state.selectedResult && this.state.selectedResult.vin === vin) return

    this.setState({
      visiblePreview: true,
      visibleFilters: false,
      isFetchingVehicle: true
    })

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

  toggleFilters() {
    this.setState({visibleFilters: !this.state.visibleFilters})
  }
}

const Layout = styled.div`
  padding: 20px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
`

const Heading = styled.h1`
  margin: 0 0 16px;
`

const Filters = styled.div`
  margin-right: 32px;
  position: fixed;
`

const Triangle = styled.span`
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  margin-bottom: 1px;

  transition: transform 200ms;
  ${p => p.left ?
    'border-right: 8px solid black;'
    :
    'border-left: 8px solid black;'
  }
`
const FilterPanelToggle = styled.button`
  margin-bottom: 8px;

  .copy {
    display: inline-block;
    margin-left: 8px;
  }
`

const Results = styled.div`
  position: relative;
  flex-grow: 1;
  margin-left: 240px;
`

const SearchLoader = styled.p`
  position: absolute;
  top: 10vh;
  width: 100%;
  text-align: center;
`

const Preview = styled.div``
const VehicleLoader = styled.div``
const PreviewPanelToggle = styled.div``
