import styled from 'styled-components'

export default styled.span`
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  margin-bottom: 1px;

  transition: transform 200ms;
  ${p => p.left ?
    'border-right: 6px solid black;'
    :
    'border-left: 6px solid black;'
  }
`
