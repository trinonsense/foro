import React from 'react'
import makesModels from '../data/makes-models'
const makes = Object.keys(makesModels)

export default class MakeModelForm extends React.PureComponent {
  render() {
    return (
      <div>
        <fieldset>
          <h4>Make</h4>
          <select name="make" value={this.state.make} onChange={this.updateMake}>
            <option value="">Any</option>
            {makes.map(make =>
              <option value={make} key={make}>{make}</option>
            )}
          </select>
        </fieldset>

        <fieldset>
          <h4>Model</h4>
          <select name="model" value={this.state.model} onChange={this.updateModel}>
            <option value="">Any</option>
            {this.state.models.map(model =>
              <option value={model} key={model}>{model}</option>
            )}
          </select>
        </fieldset>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.initialState = {
      make: this.props.make,
      model: this.props.model,
      models: makesModels[this.props.make] || []
    }

    this.state = this.initialState
    this.updateMake = this.updateMake.bind(this)
    this.updateModel = this.updateModel.bind(this)
  }

  updateMake(event) {
    const make = event.target.value
    this.setState({
      make,
      models: makesModels[make] || []
    })
  }

  updateModel(e) {
    this.setState({model: e.target.value})
  }
}
