import React from 'react'

export default class SearchPage extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.results.map(result =>
          <div key={result.id}>{result.make} {result.model}</div>
        )}
      </div>
    )
  }
}
