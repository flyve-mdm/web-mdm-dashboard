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
import I18n from '../../../../shared/i18n'
import Loading from '../../../../components/Loading'
import itemtype from '../../../../shared/itemtype'
import ContentPane from '../../../../components/ContentPane'

/**
 * Component with the form of change the token life
 * @class ChangeTokenLife
 * @extends PureComponent
 */
class ChangeTokenLife extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      tokenLife: this.props.tokenLife,
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
   * Save the new value of 'token life' in glpi
   * @function saveTokenLife
   */
  saveTokenLife = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { tokenLife } = this.state

      try {
        await this.props.glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmEntityconfig,
          input: [{
            id: this.props.entityID,
            agent_token_life: `P${tokenLife}D`,
          }],
        })
        this.props.saveValues('tokenLife', tokenLife)
        this.props.changeMode('')
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.token_life_changed'),
          type: 'success',
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
          displayErrorPage: false,
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
      tokenLife,
    } = this.state
    const { changeMode } = this.props

    return isLoading
      ? <Loading message={`${I18n.t('commons.saving')}...`} />
      : (
        <ContentPane>
          <div className="list-element">
            {I18n.t('settings.entity.date_period')}
            <div className="list-element__detail">
              {I18n.t('settings.entity.number_of_days')}
            </div>
          </div>
          <div className="list-element">
            <input
              type="number"
              className="win-textbox"
              name="tokenLife"
              value={tokenLife}
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
            onClick={this.saveTokenLife}
            type="submit"
          >
            {I18n.t('commons.save')}
          </button>
        </ContentPane>
      )
  }
}

ChangeTokenLife.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  tokenLife: PropTypes.string.isRequired,
  saveValues: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  entityID: PropTypes.string.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default ChangeTokenLife
