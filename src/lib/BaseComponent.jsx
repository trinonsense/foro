import React from 'react'
import styled from 'styled-components'

export default class BaseComponent extends React.PureComponent {
  render() {
    return (
      <BaseStyles>{this.props.children}</BaseStyles>
    )
  }
}

const BaseStyles = styled.div`
  * {
    font-family: 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
  }

  padding: 20px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
`
