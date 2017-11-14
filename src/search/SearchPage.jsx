import React from 'react'
import SearchFilters from './SearchFilters'
import request from 'superagent'
import SearchResults from './SearchResults'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import assign from 'lodash.assign'
import Triangle from '../lib/Triangle'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Filters visible={this.state.visibleFilters}>
          <Heading>
            <a href="/">
              <img src="/images/logo.png" alt="Foro Logo"/>
              FORO
            </a>
          </Heading>
          <FilterPanelToggle className="pure-button" onClick={this.toggleFilters}>
            <Triangle left={this.state.visibleFilters} />
            <span className="copy">{this.state.visibleFilters ? 'Hide' : 'Show'} Filters</span>
          </FilterPanelToggle>

          {this.state.visibleFilters ?
            <SearchFilters query={this.props.query} />
          : null}
        </Filters>

        <Results full={!this.state.visibleFilters}>
          <SearchResults results={this.state.results} />

          {!this.state.total && !this.state.isSearching ?
            <SearchLoader>Sorry, no cars found</SearchLoader>
          : null}

          {this.state.isSearching ?
            <SearchLoader>Searching Cars...</SearchLoader>
          : null}
        </Results>
      </Layout>
    )
  }

  constructor(props) {
    super(props)
    this.toggleFilters = this.toggleFilters.bind(this)

    this.state = {
      page: 0,
      isSearching: true,
      visibleFilters: true,
      results: []
    }
  }

  componentDidMount() {
    this.search()
    this.debouncedInfiniteSearch = debounce(this.infiniteSearch.bind(this), 200)
    window.addEventListener('scroll', this.debouncedInfiniteSearch)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.results.length >= this.state.total) {
      window.removeEventListener('scroll', this.debouncedInfiniteSearch)
    }
  }

  search() {
    const page = this.state.page + 1
    request
      .get('https://autolist-test.herokuapp.com/search')
      .query(assign({page}, this.props.query))
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          page,
          isSearching: false,
          total: res.body.total_count,
          results: this.state.results.concat(res.body.records)
        })
      })
  }

  infiniteSearch() {
    if (this.state.isSearching) return

    const {document} = window
    const threshold = window.innerHeight
    const scrollPosition = (window.scrollY || window.pageYOffset) + window.innerHeight
    const docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )

    if (docHeight - scrollPosition <= threshold) this.search()
  }

  toggleFilters() {
    this.setState({visibleFilters: !this.state.visibleFilters})
  }
}

const Layout = styled.div``
const Heading = styled.h1`
  margin: 0 0 16px;

  a {
    font-family: 'Roboto',sans-serif;
    color: black;
    text-decoration: none;
  }

  img {
    display: block;
    width: 80px;
    margin-bottom: 3px;
  }
`
const Filters = styled.div`
  position: fixed;
`
const FilterPanelToggle = styled.button`
  margin-bottom: 8px;
  font-size: 80%;
  width: 100%;

  .copy {
    display: inline-block;
    margin-left: 4px;
  }
`
const Results = styled.div`
  position: relative;
  flex-grow: 1;
  margin-left: ${p => p.full ? '130px' : '250px'};
`
const SearchLoader = styled.h2`
  position: absolute;
  top: 10vh;
  width: 100%;
  text-align: center;
`
