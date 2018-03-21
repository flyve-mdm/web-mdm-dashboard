import React from 'react'
import plugins from '../../../../data/plugins.json'

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
    <div>
      <h2>System Information</h2>
      <div className="aboutPane">
        {element}
      </div>
    </div>
  )
}

export default SystemInformation