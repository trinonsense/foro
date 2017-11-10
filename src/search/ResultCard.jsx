import React from 'react'

export default class ResultCard extends React.PureComponent {
  render() {
    return (
      <div>{JSON.stringify(this.props.result)}</div>
    )
  }
}
