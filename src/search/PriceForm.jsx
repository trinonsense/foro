import React from 'react'

export default class PriceForm extends React.PureComponent {
  render() {
    return (
      <fieldset>
        <h4>Price </h4>
        <label>Min: <input name="price_min" type="text" size="5" defaultValue={this.props.min} /></label>
        <label> Max: <input name="price_max" type="text" size="5" defaultValue={this.props.max} /></label>
      </fieldset>
    )
  }
}
