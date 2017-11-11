import React from 'react'
import MakeModelForm from './MakeModelForm'
import PriceForm from './PriceForm'

export default class SearchFilters extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="/search">
          <MakeModelForm
            make={this.props.query.make}
            model={this.props.query.model}
          />

          <PriceForm
            min={this.props.query.price_min}
            max={this.props.query.price_max}
          />

          <div>
            Year
            <label htmlFor="year_min"> Min</label>
            <input id="year_min" name="year_min" type="text"/>

            <label htmlFor="year_max">Max</label>
            <input type="text" id="year_max" name="year_max"/>
          </div>

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

          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}
