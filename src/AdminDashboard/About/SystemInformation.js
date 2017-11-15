import React, { Component } from 'react'
import plugins from '../data/plugins.json'

export default class SystemInformation extends Component {
    render() {
        let element = []
        plugins.forEach(plugin => {
            console.log(plugin.name)
            element.push(
                <div className="plugins" key={plugin.id}>
                    <div className="pluginLeft">
                        <div><b>{ plugin.name }</b></div>
                        <div dangerouslySetInnerHTML={{__html: plugin.author}}></div>
                    </div>
                    <div className="pluginRight">
                        <div><b >{ plugin.version }</b></div>
                        <div>{ plugin.license }</div>
                    </div>
                </div>
            )
        })
        return <div>{element}</div>
    }
}
