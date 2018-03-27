import React from 'react'
import plugins from '../../../../data/plugins.json'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"

const SystemInformation = () => {
  let element = []
  plugins.forEach(plugin => {
    element.push(
      <div className="plugins" key={plugin.id}>
        <div className="pluginLeft">
          <div className="pluginTitle">{ plugin.name }</div>
          <div className="pluginDetail" dangerouslySetInnerHTML={{__html: plugin.author}}></div>
        </div>
        <div className="pluginRight">
          <span className="pluginTitle">{ plugin.version }</span>
          <div className="pluginDetail">{ plugin.license }</div>
        </div>
      </div>
    )
  })
  return (
    <ContentPane>
      <h2>{I18n.t('about.system_information.title')}</h2>
      <div className="aboutPane">
        {element}
      </div>
    </ContentPane>
  )
}

export default SystemInformation