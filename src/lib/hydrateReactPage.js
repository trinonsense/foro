import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from './BaseComponent'

export default function hydrateReactPage(PageComponent) {
  ReactDOM.hydrate(
    <BaseComponent>
      <PageComponent {...window.__data} />
    </BaseComponent>,
    document.getElementById('react-root')
  )
}
