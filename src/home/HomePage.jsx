import React from 'react'
import MakeModelForm from '../search/MakeModelForm'
import PriceForm from '../search/PriceForm'

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="/search">
          <MakeModelForm makes={this.props.makes} />
          <PriceForm />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}
