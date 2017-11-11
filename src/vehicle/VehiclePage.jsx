import React from 'react'

export default class VehiclePage extends React.PureComponent {
  render() {
    return (
      <code>{JSON.stringify(this.props.vehicle)}</code>
    )
  }
}
