import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default function renderReactPage(res, {PageComponent, reactData = {}, templateData}) {
  if (!templateData.clientScript) throw new Error('missing client script')

  res.render('react-page', Object.assign({
    reactData: JSON.stringify(reactData),
    reactRoot: ReactDOMServer.renderToString(<PageComponent {...reactData} />)
  }, templateData))
}
