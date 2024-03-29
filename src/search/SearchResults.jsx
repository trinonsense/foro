import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import Tag from '../lib/Tag'

export default class SearchResults extends React.PureComponent {
  render() {
    return (
      <Results>
        {this.props.results.map(result =>
          <Result href={'/vehicle/' + result.vin} key={result.id}>
            <FluidContainer ratio="16:9">
              <LazyLoad true>
                <Thumb src={result.primary_photo_url} />
              </LazyLoad>
            </FluidContainer>
            <ResultInfo>
              <div>
                <Info>{result.year} {result.make} <Tag>{result.condition}</Tag> </Info>
                <Model>{result.model}</Model>
                <Info>{result.trim}</Info>
                <Info>{result.display_color}</Info>
              </div>
              <div>
                <Mileage>{result.mileage}</Mileage>
                <Price>{result.price}</Price>
              </div>
            </ResultInfo>
          </Result>
        )}
      </Results>
    )
  }
}

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: -20px;
`
const Result = styled.a`
  display: block;
  width: 50%;
  box-sizing: border-box;
  padding-right: 20px;
  padding-bottom: 20px;
  text-decoration: none;
  color: black;
`
const FluidContainer = styled.div`
  position: relative;
  padding-bottom: ${p => {
    const r = p.ratio.split(':')
    return r[1] / r[0] * 100
  }}%;
`
const Thumb = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${p => p.src});
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
const ResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`
const Price = styled.h1`
  color: #0078e7;
  margin: 0;
`
const Info = styled.p`
  margin-top: 0;
  margin-bottom: 6px;
`
const Model = styled.h2`
  margin-top: 0;
  margin-bottom: 6px;
`
const Mileage = Info.extend`
  text-align: right;
`
