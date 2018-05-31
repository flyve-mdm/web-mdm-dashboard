/*
*   Copyright © 2018 Teclib. All rights reserved.
*
*   This file is part of web-mdm-dashboard
*
* web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
* device management software.
*
* Flyve MDM is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* Flyve MDM is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* ------------------------------------------------------------------------------
* @author     Gianfranco Manganiello (gmanganiello@teclib.com)
* @author     Hector Rondon (hrondon@teclib.com)
* @copyright  Copyright © 2018 Teclib. All rights reserved.
* @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
* @link       https://github.com/flyve-mdm/web-mdm-dashboard
* @link       http://flyve.org/web-mdm-dashboard
* @link       https://flyve-mdm.com
* ------------------------------------------------------------------------------
*/

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
            <div className="plugins--left">
              <div className="plugin__title">{ plugin.name }</div>
              <div className="plugin__detail" dangerouslySetInnerHTML={{__html: plugin.author}}></div>
            </div>
            <div className="plugin--right">
              <span className="plugin__title">{ plugin.version }</span>
              <div className="plugin__detail">{ plugin.license }</div>
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