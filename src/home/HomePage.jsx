import React from 'react'
import MakeModelForm from '../search/MakeModelForm'
import PriceForm from '../search/PriceForm'
import styled from 'styled-components'

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Dialog>
          <Heading>
            FORO <img src="/images/logo.png" alt="Foro Logo"/>
          </Heading>
          <form action="/search" className="pure-form">
            <MakeModelForm makes={this.props.makes} />
            <PriceForm />
            <button type="submit" className="pure-button pure-button-primary">
              Search Your Next Car
            </button>
          </form>
        </Dialog>
      </Layout>
    )
  }
}

const Layout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(/images/home-bg.jpeg);
  background-size: cover;
  background-position: center;
`
const Dialog = styled.div`
  position: absolute;
  right: 15vw;
  top: 20vh;
  background-color: rgba(255, 255, 255, 0.62);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    margin-top: 0;
    margin-bottom: 6px;
  }

  select {
    width: 100%;
  }

  button {
    width: 100%;
    margin-top: 12px;
  }
`
const Heading = styled.h1`
  margin-top: 0;
  text-align: center;

  img {
    height: 23px;
    display: inline-block;
    margin-left: 6px;
  }
`
