import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default function renderReactPage(res, {PageComponent, clientScript, reactData = {}, templateData}) {
  if (!clientScript) throw new Error('missing client script')

  res.render('react-page', Object.assign({
    clientScript,
    reactData: JSON.stringify(reactData),
    reactRoot: ReactDOMServer.renderToString(<PageComponent {...reactData} />)
  }, templateData))
}
