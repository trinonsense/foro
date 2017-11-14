import React from 'react'
import Triangle from '../lib/Triangle'
import styled from 'styled-components'
import Tag from '../lib/Tag'
import {Carousel} from 'react-responsive-carousel'

export default class VehiclePage extends React.PureComponent {
  render() {
    const {vehicle} = this.props
    return (
      <div>
        <Nav>
          <Search href="/search">
            <Triangle left />
            SEARCH
          </Search>
          <Heading>
            <a href="/">
              FORO
              <img src="/images/logo.png" alt="Foro Logo"/></a>
          </Heading>
        </Nav>
        <Content>
          <InfoHighlight>
            <Photos>
              <Carousel showIndicators={false} infiniteLoop>
                {vehicle.photo_urls.map((photo, i) =>
                  <div key={i}>
                    <img src={photo} alt={'photo #' + i} />
                  </div>
                )}
              </Carousel>
            </Photos>
            <MainInfo>
              <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
              <h2>{vehicle.trim}</h2>
              <p><Tag>{vehicle.condition}</Tag> {vehicle.miles && vehicle.pretty_miles}</p>
              <Price>{vehicle.price_formatted}</Price>
              <p>
                Sold by <br/>
                <Address href={`http://maps.google.com/maps?q=${encodeURI(vehicle.dealer_name + ' ' + vehicle.address + ' ' + vehicle.zip)}`} target="_blank">
                  {vehicle.dealer_name}<br/>
                  {vehicle.address}<br/>
                  {vehicle.city}, {vehicle.state} {vehicle.zip}
                </Address>
              </p>
              <ViewListing className="pure-button pure-button-primary" href={vehicle.clickoff_url} target="_blank">
                View Listing
              </ViewListing>
            </MainInfo>
          </InfoHighlight>
          <div className="basic-info">
            <p>{vehicle.vin}</p>
            <p>{vehicle.transmission}</p>
            <p>{vehicle.engine_type}</p>
            <p>{vehicle.driveline}</p>
            <p>{vehicle.mpg}</p>
          </div>
          <div className="features">
            <p>{vehicle.interior_color}</p>
            <p>{vehicle.exterior_color}</p>
            <p>{vehicle.interior_features}</p>
            <p>{vehicle.exterior_features}</p>
            <p>{vehicle.safety_features}</p>
          </div>
        </Content>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      isLightboxOpen: false
    }
  }

  closeLightbox() {
    this.setState({isLightboxOpen: false})
  }
}

const Nav = styled.nav`
  position: relative;
`
const Content = styled.main`
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.14);
  margin-top: 16px;
`
const Search = styled.a`
  position: absolute;
  font-family: 'Roboto',sans-serif;
  color: black;
  text-decoration: none;
  top: 50%;
  margin-top: -9px;

  span {
    position: relative;
    top: -1px;
    margin-right: 4px;
  }
`
const Heading = styled.h1`
  margin: 0;
  text-align: center;

  a {
    font-family: 'Roboto',sans-serif;
    color: black;
    text-decoration: none;
  }

  img {
    height: 23px;
    display: inline-block;
    margin-left: 6px;
  }
`
const Address = styled.a`
  color: black;
`
const Price = styled.h1`
  color: #0078e7;
`
const InfoHighlight = styled.div`
  display: flex;
`
const MainInfo = styled.div`
  width: 30%;
  text-align: right;
`
const Photos = styled.div`
  width: 60%;
`
const ViewListing = styled.button`
  width: 100%;
  margin-bottom: 20px;
`
