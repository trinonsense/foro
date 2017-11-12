import React from 'react'

export default class ResultPreview extends React.PureComponent {
  render() {
    return (
      <div>
        <code>{JSON.stringify(this.props.result)}</code>
      </div>
    )
  }
}
