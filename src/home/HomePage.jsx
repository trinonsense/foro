import React from 'react'
import MakeModelForm from '../search/MakeModelForm'

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="/search">
          <MakeModelForm makes={this.props.makes} />

          <div>
            <label>Price</label>
            <label htmlFor="price_min">Min:</label>
            <input name="price_min" id="price_min" type="text" />
            <label htmlFor="price_max">Max:</label>
            <input name="price_max" id="price_max" type="text" />
          </div>

          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}
