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

/** impport dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../shared/i18n'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import itemtype from '../../../../shared/itemtype'

/**
 * Show System Information
 * @class SystemInformation
 */
class SystemInformation extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      plugins: undefined,
    }
  }

  componentDidMount = async () => {
    try {
      const plugins = await this.props.glpi.getAllItems({
        itemtype: itemtype.Plugin,
      })
      this.setState({
        isLoading: false,
        plugins,
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const {
      plugins,
      isLoading,
    } = this.state

    const element = []

    if (plugins) {
      plugins.forEach((plugin) => {
        element.push(
          <div className="plugins" key={plugin.id}>
            <div className="plugins--left">
              <div className="plugin__title">
                { plugin.name }
              </div>
              <div
                className="plugin__detail"
                dangerouslySetInnerHTML={{ __html: plugin.author }}
              />
            </div>
            <div className="plugin--right">
              <span className="plugin__title">
                { plugin.version }
              </span>
              <div className="plugin__detail">
                { plugin.license }
              </div>
            </div>
          </div>,
        )
      })
    }

    return (
      isLoading
        ? <Loading message={`${I18n.t('commons.loading')}...`} />
        : (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('about.system_information.title')}
            </h2>
            <div className="about-pane" style={{ margin: '10px' }}>
              {element}
            </div>
          </ContentPane>
        )
    )
  }
}

/** SystemInformation propsTypes */
SystemInformation.propTypes = {
  glpi: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withGLPI(SystemInformation)
