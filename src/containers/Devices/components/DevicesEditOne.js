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
import I18n from '../../../shared/i18n'
import ContentPane from '../../../components/ContentPane'
import ConstructInputs from '../../../components/Forms'
import {
  agentScheme,
} from '../../../components/Forms/Schemas'
import Loading from '../../../components/Loading'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'
import getID from '../../../shared/getID'

/**
 * @class DevicesEditOne
 * @extends PureComponent
 */
export default class DevicesEditOne extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      id: getID(this.props.history.location.pathname, 3),
    }
  }

  componentDidMount() {
    const { id } = this.state

    if (Number(id)) {
      this.handleRefresh()
    } else {
      this.props.history.push(`${publicURL}/app/devices`);
    }
  }

  /**
   * handle refresh selected device
   * @function handleRefresh
   */
  handleRefresh = () => {
    const { id } = this.state

    this.props.glpi.getAnItem({
      itemtype: itemtype.PluginFlyvemdmAgent,
      id,
    })
      .then((response) => {
        this.setState({
          isLoading: false,
          id: response.id,
          name: response.name,
          fleet: {
            value: response.plugin_flyvemdm_fleets_id,
            request: {
              params: {
                itemtype: itemtype.PluginFlyvemdmFleet,
                options: {
                  forcedisplay: [2],
                },
              },
              method: 'searchItems',
              content: '1',
              value: '2',
            },
          },
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          id: null,
          name: '',
          fleet: {
            value: '',
            request: {
              params: {
                itemtype: itemtype.PluginFlyvemdmFleet,
                options: {
                  forcedisplay: [2],
                },
              },
              method: 'searchItems',
              content: '1',
              value: '2',
            },
          },
        })
      })
  }

  /**
   * handle set state
   * @function changeState
   * @param {string} name
   * @param {object} value
   */
  changeState = (name, value) => {
    if (name === 'fleet') {
      const { [name]: currentValue } = this.state

      this.setState({
        [name]: {
          ...currentValue,
          value,
        },
      })
    } else {
      this.setState({
        [name]: value,
      })
    }
  }

  /**
   * handle save one device
   * @function handleSaveOneDevices
   */
  handleSaveOneDevices = () => {
    const {
      name,
      fleet,
      id,
    } = this.state

    this.setState({
      isLoading: true,
    })
    const input = {
      name,
      plugin_flyvemdm_fleets_id: fleet.value,
    }
    this.props.glpi.updateItem({
      itemtype: itemtype.PluginFlyvemdmAgent,
      id,
      input,
    })
      .then(() => {
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.changes_saved_successfully'),
          type: 'success',
        })
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false);
        this.props.history.push(`${publicURL}/app/devices/${id}`);
      })
      .catch((error) => {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
        }))
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const {
      name,
      isLoading,
    } = this.state

    const componetRender = (
      <ContentPane>
        <Loading message={`${I18n.t('commons.loading')}...`} />
      </ContentPane>
    )

    if (!this.state) {
      return componetRender
    }
    const agent = name ? agentScheme({
      state: this.state,
      changeState: this.changeState,
      glpi: this.props.glpi,
    }) : null

    if (agent && !isLoading) {
      return (
        <ContentPane>
          <div className="content-header" style={{ display: 'inline-flex' }}>
            <button
              className="btn btn--primary"
              style={{ margin: 0 }}
              onClick={this.handleSaveOneDevices}
              type="button"
            >
              {I18n.t('commons.save')}
            </button>
          </div>
          <div className="separator" />
          <ConstructInputs data={agent.mainInformation} />
        </ContentPane>
      )
    }
    return componetRender
  }
}

/** DevicesEditOne propTypes */
DevicesEditOne.propTypes = {
  changeSelectionMode: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}
