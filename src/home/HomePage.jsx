import React from 'react'
import request from 'superagent'

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="/search">
          <div>
            <label htmlFor="make">Make</label>
            <select name="make" id="make" value={this.state.make} onChange={this.updateMake}>
              <option>---</option>
              {this.props.makes.map(make =>
                <option value={make} key={make}>{make}</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="model">Model</label>
            <select name="model" id="model">
              {this.state.models.map(model => typeof model === 'string' ?
                <option value={model} key={model}>{model}</option>
                :
                <option value={model.Model_Name} key={model.Model_ID}>{model.Model_Name}</option>
              )}
            </select>
          </div>

          <div>
            <label>Price</label>
            <label htmlFor="price-min">Min:</label>
            <input name="price-min" id="price-min" type="text" />
            <label htmlFor="price-max">Max:</label>
            <input name="price-max" id="price-max" type="text" />
          </div>

          <button type="submit">Search</button>
        </form>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.initialState = {
      make: '',
      models: ['---']
    }

    this.state = this.initialState
    this.updateMake = this.updateMake.bind(this)
  }

  updateMake(event) {
    const make = event.target.value

    if (make === '---') {
      return this.setState(this.initialState)
    }

    this.setState({
      make,
      models: ['loading...']
    })

    request
      .get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`)
      .end((err, res) => {
        if (err) return console.log(err)
        this.setState({models: ['Any'].concat(res.body.Results)})
      })
  }
}
