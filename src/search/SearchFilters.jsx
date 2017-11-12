import React from 'react'
import MakeModelForm from './MakeModelForm'
import PriceForm from './PriceForm'
import styled from 'styled-components'

export default class SearchFilters extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="/search" className="pure-form">
          <fieldset>
            <MakeModelForm
              make={this.props.query.make}
              model={this.props.query.model}
            />

            <PriceForm
              min={this.props.query.price_min}
              max={this.props.query.price_max}
            />

            <div>
              <h4>Year</h4>
              <label>Min: <input name="year_min" type="text" size="4" maxLength="4" /> </label>
              <label>Max: <input name="year_max" type="text" size="4" maxLength="4" /> </label>
            </div>

            <div>
              <h4>Condition:</h4>
              <label>New <input value="new" name="condition[]" type="checkbox"/></label><br/>
              <label>Used <input value="used" name="condition[]" type="checkbox"/></label><br/>
              <label>Certified Pre-owned <input value="certified pre-owned" name="condition[]" type="checkbox"/></label>
            </div>

            <SearchButton type="submit" className="pure-button pure-button-primary">
              Search
            </SearchButton>
          </fieldset>
        </form>
      </div>
    )
  }
}

const SearchButton = styled.button`
  width: 100%;
`
