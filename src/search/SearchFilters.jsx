import React from 'react'
import MakeModelForm from './MakeModelForm'
import PriceForm from './PriceForm'
import styled from 'styled-components'

export default class SearchFilters extends React.PureComponent {
  render() {
    const {query} = this.props

    return (
      <Component>
        <form action="/search" className="pure-form">
          <MakeModelForm
            make={query.make}
            model={query.model}
          />

          <PriceForm
            min={query.price_min}
            max={query.price_max}
          />

          <fieldset>
            <h4>Year</h4>
            <label>Min: <input name="year_min" type="text" size="5" maxLength="4" defaultValue={query.year_min}/> </label>
            <label>Max: <input name="year_max" type="text" size="5" maxLength="4" defaultValue={query.year_max}/> </label>
          </fieldset>

          <Condition>
            <h4>Condition</h4>
            <label>New <input value="new" name="condition[]" type="checkbox"/></label><br/>
            <label>Used <input value="used" name="condition[]" type="checkbox"/></label><br/>
            <label>Certified Pre-owned <input value="certified pre-owned" name="condition[]" type="checkbox"/></label>
          </Condition>

          <SearchButton type="submit" className="pure-button pure-button-primary">
            Search
          </SearchButton>
        </form>
      </Component>
    )
  }
}

const Component = styled.div`
  h4 {
    margin-top: 0;
    margin-bottom: 4px;
  }

  select {
    width: 100%;
    max-width: 222px;
  }
`

const SearchButton = styled.button`
  width: 100%;
`

const Condition = styled.fieldset`
  label {
    display: inline-block;
    margin-top: 0;
  }
`
