import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default function renderReactPage(res, {PageComponent, reactData = {}, templateData}) {
  res.render('react-layout', Object.assign({
    reactRoot: ReactDOMServer.renderToString(<PageComponent {...reactData} />)
  }, templateData))
}
