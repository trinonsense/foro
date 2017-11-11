import React from 'react'

export default class YearForm extends React.PureComponent {
  render() {
    return (
      <div>
        Year
        <label htmlFor="year_min"> Min</label>
        <input id="year_min" name="year_min" type="text"/>

        <label htmlFor="year_max">Max</label>
        <input type="text" id="year_max" name="year_max"/>
      </div>
    )
  }
}
