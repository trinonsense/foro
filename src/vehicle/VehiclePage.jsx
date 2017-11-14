import React from 'react'
import styled from 'styled-components'
import Tag from '../lib/Tag'
import {Carousel} from 'react-responsive-carousel'

export default class VehiclePage extends React.PureComponent {
  render() {
    const {vehicle} = this.props
    return (
      <div>
        <Nav>
          <Search href="/search">SEARCH</Search>
          <Heading>
            <a href="/">
              FORO <img src="/images/logo.png" alt="Foro Logo"/>
            </a>
          </Heading>
        </Nav>
        <Content>
          <Photos>
            <Carousel showIndicators={false} infiniteLoop>
              {vehicle.photo_urls.map((photo, i) =>
                <div key={i}>
                  <img src={photo} alt={'photo #' + i} />
                </div>
              )}
            </Carousel>
          </Photos>
          <InfoPanel>
            <Title>{vehicle.year} {vehicle.make} {vehicle.model} // {vehicle.trim} <Tag>{vehicle.condition}</Tag></Title>
            <Price>{vehicle.price_formatted}</Price>
            <p>
              <Address href={`http://maps.google.com/maps?q=${encodeURI(vehicle.dealer_name + ' ' + vehicle.address + ' ' + vehicle.zip)}`} target="_blank">
                {vehicle.dealer_name}<br/>
                {vehicle.address}<br/>
                {vehicle.city}, {vehicle.state} {vehicle.zip}
              </Address>
            </p>
            <ViewListing className="pure-button pure-button-primary" href={vehicle.clickoff_url} target="_blank">
              View Listing
            </ViewListing>

            <ExtraInfo>
              <tbody>
                <tr><th>Mileage</th> <td>{vehicle.mileage && vehicle.pretty_miles}</td></tr>
                <tr><th>Exterior Color</th> <td>{vehicle.exterior_color}</td></tr>
                <tr><th>Interior Color</th> <td>{vehicle.interior_color}</td></tr>
                <tr><th>MPG</th> <td>{vehicle.mpg}</td></tr>
                <tr><th>Transmission</th> <td>{vehicle.transmission}</td></tr>
                <tr><th>Engine</th> <td>{vehicle.engine_type}</td></tr>
                <tr><th>Drivetrain</th> <td>{vehicle.driveline}</td></tr>
                <tr><th>VIN</th> <td>{vehicle.vin}</td></tr>
                <tr>
                  <th>Exterior Features</th>
                  <td>{vehicle.exterior_features && vehicle.exterior_features.join(', ')}</td>
                </tr>
                <tr>
                  <th>Interior Features</th>
                  <td>{vehicle.interior_features && vehicle.interior_features.join(', ')}</td>
                </tr>
                <tr>
                  <th>Safety Features</th>
                  <td>{vehicle.safety_features && vehicle.safety_features.join(', ')}</td>
                </tr>
              </tbody>
            </ExtraInfo>
          </InfoPanel>
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
  display: flex;
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
const InfoPanel = styled.div`
  width: 40%;
  padding-left: 20px;
`
const Photos = styled.div`
  width: 60%;
`
const ViewListing = styled.a`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  display: block;
`
const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 8px;

  span {
    font-size: 50%;
    top: -4px;
  }
`
const Price = styled.h1`
  margin-top: 0;
  margin-bottom: 24px;
  color: #0078e7;
`
const ExtraInfo = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding-bottom: 6px;
    padding-top: 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  }

  th {
    text-align: left;
    font-family: 'Roboto', sans-serif;
  }

  td {
    text-align: right;
  }

  tr:last-child th, tr:last-child td {
    border-bottom: none;
  }
`
