import React from 'react'
import request from 'superagent'

export default class MakeModelForm extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <label htmlFor="make">Make</label>
          <select name="make" id="make" value={this.state.make} onChange={this.updateMake}>
            <option value="">Any</option>
            {this.props.makes.map(make =>
              <option value={make} key={make}>{make}</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="model">Model</label>
          <select name="model" id="model" value={this.state.model} onChange={this.updateModel}>
            {this.state.models.map(model => typeof model === 'string' ?
              <option value="" key={model}>{model}</option>
              :
              <option value={model.Model_Name} key={model.Model_ID}>{model.Model_Name}</option>
            )}
          </select>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.initialState = {
      make: this.props.make,
      model: this.props.model,
      models: ['---']
    }

    this.state = this.initialState
    this.updateMake = this.updateMake.bind(this)
    this.updateModel = this.updateModel.bind(this)
  }

  componentDidMount() {
    if (this.props.make) this.getModels(this.props.make)
  }

  updateMake(event) {
    const make = event.target.value
    this.setState({make})

    if (make) {
      this.getModels(make)
    } else {
      this.setState({models: this.initialState.models})
    }
  }

  getModels(make) {
    this.setState({models: ['loading...']})

    request
      .get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`)
      .end((err, res) => {
        if (err) return console.log(err)
        this.setState({models: ['Any'].concat(res.body.Results)})
      })
  }

  updateModel(e) {
    this.setState({model: e.target.value})
  }
}
