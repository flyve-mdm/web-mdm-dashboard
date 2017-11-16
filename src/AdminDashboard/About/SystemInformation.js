import React, { Component } from 'react'
import plugins from '../data/plugins.json'

export default class SystemInformation extends Component {
    render() {
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
        return <div className="aboutPane">{element}</div>
    }
}
