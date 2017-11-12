import React from 'react'

export default class PriceForm extends React.PureComponent {
  render() {
    return (
      <div>
        <h4>Price </h4>
        <label>Min: <input name="price_min" type="text" size="4" maxLength="4" defaultValue={this.props.min} /></label>
        <label>Max: <input name="price_max" type="text" size="4" maxLength="4" defaultValue={this.props.max} /></label>
      </div>
    )
  }
}
