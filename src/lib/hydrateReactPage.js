import React from 'react'
import ReactDOM from 'react-dom'

export default function hydrateReactPage(PageComponent) {
  ReactDOM.hydrate(
    <PageComponent {...window.__data} />,
    document.getElementById('react-root')
  )
}
