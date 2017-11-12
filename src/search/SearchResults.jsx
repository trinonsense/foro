import React from 'react'

export default class SearchResults extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.results.map(result =>
          <div onClick={this.onClickResult} data-vin={result.vin} key={result.id}>
            <h2>{result.year} {result.make} {result.model} / {result.trim}</h2>
            <h3>price: {result.price}</h3>
            <p>mileage: {result.mileage}</p>
            <p>color: {result.display_color}</p>
            <p>condition: {result.condition}</p>
          </div>
        )}
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.onClickResult = this.onClickResult.bind(this)
  }

  onClickResult(e) {
    this.props.onClickResult(e.currentTarget.dataset.vin)
  }
}
