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


/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import {
  bindActionCreators,
} from 'redux'
import {
  connect,
} from 'react-redux'
import {
  I18n,
} from 'react-i18nify'
import {
  uiSetNotification,
} from '../../../../store/ui/actions'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import itemtype from '../../../../shared/itemtype'

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch),
  }
  return {
    actions,
  }
}

/**
 * Component with the form of change the download url
 * @class ChangeDownloadURL
 * @extends PureComponent
 */
class ChangeDownloadURL extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    const { downloadURL } = this.props

    this.state = {
      downloadURL,
      isLoading: false,
    }
  }

  /**
   * Handle set state
   * @function changeState
   * @param {object} e
   */
  changeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Save the new value of 'download url' in glpi
   * @function saveURL
   */
  saveURL = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        glpi,
        entityID,
        saveValues,
        changeMode,
        actions,
        handleMessage,
      } = this.props
      const { downloadURL } = this.state

      try {
        await glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmEntityconfig,
          input: [{
            id: entityID,
            download_url: downloadURL,
          }],
        })
        saveValues('downloadURL', downloadURL)
        changeMode('')
        actions.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.download_url_changed'),
          type: 'success',
        })
      } catch (error) {
        actions.setNotification(handleMessage({
          type: 'alert',
          message: error,
        }))
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      isLoading,
      downloadURL,
    } = this.state
    const { changeMode } = this.props

    return isLoading
      ? <Loading message={`${I18n.t('commons.saving')}...`} />
      : (
        <ContentPane>
          <div className="list-element">
            {I18n.t('settings.entity.url')}
            <div className="list-element__detail">
              {I18n.t('settings.entity.file_extension')}
            </div>
          </div>
          <div className="list-element">
            <input
              type="text"
              className="win-textbox"
              name="downloadURL"
              value={downloadURL}
              onChange={this.changeState}
            />
          </div>
          <button
            className="btn btn--secondary"
            style={{ marginRight: 10 }}
            onClick={() => changeMode('')}
            type="button"
          >
            {I18n.t('commons.cancel')}
          </button>
          <button
            className="btn btn--primary"
            onClick={this.saveURL}
            type="submit"
          >
            {I18n.t('commons.save')}
          </button>
        </ContentPane>
      )
  }
}

ChangeDownloadURL.propTypes = {
  changeMode: PropTypes.func.isRequired,
  downloadURL: PropTypes.string.isRequired,
  saveValues: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  entityID: PropTypes.string.isRequired,
}

export default connect(null, mapDispatchToProps)(ChangeDownloadURL)
