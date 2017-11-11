import React from 'react'

export default class SearchResults extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.results.map(result =>
          <div onClick={this.props.onClickResult} data-id={result.id} key={result.id}>
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
}
