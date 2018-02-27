import React, { Component } from 'react'
import PropTypes from 'prop-types'
import plugins from '../data/plugins.json'
import ContentPane from '../../Utils/ContentPane'

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
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2 titleContentPane">{this.props.title}</h2>
                <div className="aboutPane">{element}</div>
            </ContentPane>
        )
    }
}
SystemInformation.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired
}
