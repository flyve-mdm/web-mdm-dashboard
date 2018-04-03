import React, { Component } from 'react'
import plugins from '../../../../data/plugins.json'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"
import Loading from '../../../../components/Loading'
import withGLPI from "../../../../hoc/withGLPI"
import PropTypes from 'prop-types'
import itemtype from '../../../../shared/itemtype'

class SystemInformation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      plugins: undefined
    }
  }

  componentDidMount = async () => {
    try {
      const plugins = await this.props.glpi.getAllItems({ itemtype: itemtype.Plugin })
      this.setState({
        isLoading: false,
        plugins: plugins
      })
    } catch (error) {
      
    }
  }

  render () {
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
      this.state.isLoading ? <Loading message={`${I18n.t('commons.loading')}...`}/> :
      (
        <ContentPane>
          <h2>{I18n.t('about.system_information.title')}</h2>
          <div className="aboutPane">
            {element}
          </div>
        </ContentPane>
      )
    )
  }
}

SystemInformation.propTypes = {
  glpi: PropTypes.object.isRequired
}

export default withGLPI(SystemInformation)