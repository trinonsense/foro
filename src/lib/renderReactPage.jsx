import React from 'react'
import ReactDOMServer from 'react-dom/server'
import BaseComponent from './BaseComponent'
import { ServerStyleSheet } from 'styled-components'

export default function renderReactPage(res, {PageComponent, clientScript, reactData = {}, templateData}) {
  if (!clientScript) throw new Error('missing client script')

  const sheet = new ServerStyleSheet()
  const html = ReactDOMServer.renderToString(
    <BaseComponent>
      <PageComponent {...reactData} />
    </BaseComponent>
  )

  res.render('react-page', Object.assign({
    clientScript,
    reactData: JSON.stringify(reactData),
    reactStyles: sheet.getStyleTags(),
    reactRoot: html
  }, templateData))
}
