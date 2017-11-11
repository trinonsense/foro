import React from 'react'
import request from 'superagent'

export default class ResultCard extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>{this.props.vin}</h1>
        <code>{JSON.stringify(this.state.data)}</code>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      data: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vin) this.getData(nextProps.vin)
  }

  getData(vin) {
    this.setState({isFetching: true})
    request
      .get('/vehicle/' + vin)
      .accept('json')
      .query({vin})
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          isFetching: false,
          data: res.body
        })
      })
  }
}
