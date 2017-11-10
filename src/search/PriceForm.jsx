import React from 'react'

export default class PriceForm extends React.PureComponent {
  render() {
    return (
      <div>
        <label>Price</label>
        <label htmlFor="price_min">Min:</label>
        <input name="price_min" id="price_min" type="text" defaultValue={this.props.min} />
        <label htmlFor="price_max">Max:</label>
        <input name="price_max" id="price_max" type="text" defaultValue={this.props.max} />
      </div>
    )
  }
}
