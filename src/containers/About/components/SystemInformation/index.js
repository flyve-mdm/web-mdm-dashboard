import React, { PureComponent } from 'react'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import PropTypes from 'prop-types'
import itemtype from '../../../../shared/itemtype'
import { uiSetNotification } from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch)
  }
  return { actions }
}

class SystemInformation extends PureComponent {
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
      this.props.actions.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
      this.setState({
        isLoading: false
      })
    }
  }

  render () {
    let element = []

    if (this.state.plugins) {
      this.state.plugins.forEach(plugin => {
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
    }

    return (
      this.state.isLoading ? <Loading message={`${I18n.t('commons.loading')}...`}/> :
      (
        <ContentPane>
          <h2 style={{ margin: '10px' }}>{I18n.t('about.system_information.title')}</h2>
          <div className="about-pane" style={{ margin: '10px' }}>
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

export default connect(null, mapDispatchToProps)(withGLPI(withHandleMessages(SystemInformation)))