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
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import publicURL from 'shared/publicURL'
import IconItemList from 'components/IconItemList'
import Confirmation from 'components/Confirmation'
import Loading from 'components/Loading'
import ContentPane from 'components/ContentPane'
import EditNumbers from './EditNumbers'

/**
 * @class Main
 * @extends PureComponent
 */
export default class Main extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      update: this.props.update,
      data: undefined,
      sendingPing: false,
      changeNumbers: false,
      numbers: [],
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
      this.handleRefresh()
    } else if (this.state.changeNumbers === 2) {
      this.handleRefresh()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
      return {
        ...prevState,
        id: nextProps.id,
        update: nextProps.update,
        data: undefined,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle refresh detail devices information
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    if (this.state.update) {
      try {
        const { id } = this.state
        const data = await this.props.glpi.getAnItem({
          itemtype: itemtype.PluginFlyvemdmAgent,
          id,
        })

        let numbers = []

        const deviceSimcard = await this.props.glpi.genericRequest({
          path: `${itemtype.Item_DeviceSimcard}/?searchText[itemtype]=${itemtype.Computer}&searchText[items_id]=${id}`,
        })

        if (deviceSimcard.length > 0) {
          const lineID = deviceSimcard.map(e => ({
            itemtype: itemtype.Line,
            items_id: e.lines_id,
          }))

          const lines = await this.props.glpi.getMultipleItems({
            items: lineID,
          })

          numbers = lines.map(line => ({
            id: line.id,
            value: line.name,
          }))
        }

        this.setState({
          data,
          numbers,
          isLoading: false,
          changeNumbers: false,
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
        }))
        this.props.history.push(`${publicURL}/app/devices`)
      }
    }
  }

  /**
   * handle delete selected device
   * @async
   * @function handleRefresh
   */
  handleDelete = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      this.setState({
        isLoading: true,
      })

      this.props.glpi.deleteItem({
        itemtype: itemtype.PluginFlyvemdmAgent,
        id: this.state.id,
      })
        .then(() => {
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.device_successfully_removed'),
            type: 'success',
          })
          this.props.changeSelectionMode(false)
          this.props.history.push(`${publicURL}/app/devices`)
          this.props.changeAction('reload')
        })
        .catch((error) => {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: error,
          }))
        })
    }
  }

  /**
   * handle edit selected device
   * @function handleEdit
   */
  handleEdit = () => {
    const path = `${publicURL}/app/devices/${this.state.id}/edit`
    this.props.history.push(path)
  }

  /**
   * handle ping to device
   * @function ping
   */
  ping = () => {
    this.setState({
      sendingPing: true,
    }, async () => {
      try {
        const response = await this.props.glpi.genericRequest({
          path: `${itemtype.PluginFlyvemdmAgent}/${this.state.id}`,
          requestParams: {
            method: 'PUT',
            body: JSON.stringify({
              input: {
                _ping: '',
              },
            }),
          },
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: response[0].message ? response[0].message : I18n.t('notifications.ping_sent'),
          type: 'success',
        })
        this.setState({
          sendingPing: false,
        }, () => {
          this.handleRefresh()
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
          displayErrorPage: false,
        }))
        this.setState({
          sendingPing: false,
        })
      }
    })
  }

  changeNumbers = async (newNumbers, deleteNumbers) => {
    this.setState({
      isLoading: true,
      changeNumbers: 0,
    })

    // Update and add numbers
    newNumbers.forEach(async (newNumber, index) => {
      if (newNumber.id === 0) {
        const deviceSimcard = await this.props.glpi.addItem({
          itemtype: itemtype.DeviceSimcard,
          input: {},
        })

        const line = await this.props.glpi.addItem({
          itemtype: itemtype.Line,
          input: { name: newNumber.value },
        })

        await this.props.glpi.addItem({
          itemtype: itemtype.Item_DeviceSimcard,
          input: {
            itemtype: itemtype.Computer,
            items_id: this.state.id,
            lines_id: line.id,
            devicesimcards_id: deviceSimcard.id,
          },
        })
      } else if (newNumber.value) {
        await this.props.glpi.updateItem({
          itemtype: itemtype.Line,
          id: newNumber.id,
          input: {
            name: newNumber.value,
          },
        })
      }

      // Counter to update the device data
      if (newNumbers.length === index + 1) {
        // validator used to update the data
        // (when this value reaches two the component is updated)
        const update = deleteNumbers.length > 0
          ? 1
          : 2
        this.setState(prevState => ({
          changeNumbers: prevState.changeNumbers + update,
        }))
      }
    })

    // Delete numbers
    const itemDeviceSimcard = await this.props.glpi.getAllItems({
      itemtype: itemtype.Item_DeviceSimcard,
      queryString: {
        searchText: {
          itemtype: itemtype.Computer,
          items_id: this.state.id,
        },
      },
    })

    await deleteNumbers.forEach(async (numberID, index) => {
      let deviceSimcard

      itemDeviceSimcard.forEach((x) => {
        if (x.lines_id === numberID) {
          deviceSimcard = x
        }
      })

      if (deviceSimcard) {
        await this.props.glpi.deleteItem({
          itemtype: itemtype.Line,
          id: numberID,
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.DeviceSimcard,
          id: deviceSimcard.devicesimcards_id,
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.Item_DeviceSimcard,
          id: deviceSimcard.id,
        })

        // Counter to update the device data
        if (deleteNumbers.length === index + 1) {
          // validator used to update the data
          // (when this value reaches two the component is updated)
          const update = newNumbers.length > 0
            ? 1
            : 2
          this.setState(prevState => ({
            changeNumbers: prevState.changeNumbers + update,
          }))
        }
      }
    })
  }

  render() {
    let renderComponent
    if (!this.state.data || !this.state.numbers || this.state.isLoading) {
      renderComponent = (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    } else {
      const imageAgent = this.state.data.mdm_type ? `${this.state.data.mdm_type}.png` : null
      let iconComponent

      if (imageAgent) {
        iconComponent = (
          <IconItemList
            image={imageAgent}
            size={72}
            backgroundColor="transparent"
          />
        )
      } else {
        iconComponent = (
          <IconItemList size={72} />
        )
      }
      if (this.state.changeNumbers) {
        renderComponent = (
          <ContentPane className="devices">
            <EditNumbers
              numbers={this.state.numbers}
              save={this.changeNumbers}
              cancel={() => this.setState({ changeNumbers: false })}
            />
          </ContentPane>
        )
      } else {
        renderComponent = (
          <ContentPane className="devices">
            <div className="content-header">
              <div className="item-info">
                {iconComponent}
                <div>
                  <div className="item-info__name">
                    {this.state.data.name}
                  </div>
                  <div className="item-info__message">
                    {
                      this.state.data.is_online === 1
                        ? I18n.t('commons.online')
                        : I18n.t('commons.offline')
                    }
                  </div>
                  <div className="item-info__source">
                    {this.state.data.last_contact}
                    &nbsp;
                    {' '}
                    {I18n.t('devices.main.last_contact')}
                  </div>
                  <div style={{ overflow: 'auto' }}>
                    <div>
                      <button
                        className="btn btn--secondary"
                        style={{ float: 'left', marginTop: 5, marginBottom: 5 }}
                        onClick={this.ping}
                        type="button"
                      >
                        {I18n.t('commons.ping')}
                      </button>
                      {
                        this.state.sendingPing
                          ? <Loading small />
                          : ''
                      }
                    </div>
                  </div>
                  <div>
                    <span
                      className="iconFont editIcon"
                      style={{ marginRight: '20px', fontSize: '20px' }}
                      onClick={this.handleEdit}
                      role="button"
                      tabIndex="0"
                    />
                    <span
                      className="iconFont deleteIcon"
                      style={{ marginRight: '20px', fontSize: '20px' }}
                      onClick={this.handleDelete}
                      role="button"
                      tabIndex="0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="separator" />
            <div className="content-info">
              <div className="title">
                {I18n.t('commons.version')}
              </div>
              <div style={{ paddingLeft: 20 }}>
                {this.state.data.version}
              </div>
              <div className="title">
                {I18n.t('commons.type')}
              </div>
              <div style={{ paddingLeft: 20 }}>
                {this.state.data.mdm_type}
              </div>

              <div className="title">
                {I18n.t('commons.telephone_numbers')}
              </div>

              {
                this.state.numbers.map((number, index) => (
                  <div
                    key={`cell-number-${index.toString()}`}
                    style={{ paddingLeft: 20 }}
                  >
                    <a href={`tel:${number.value}`}>
                      { number.value }
                    </a>
                  </div>
                ))
              }
              {
                this.state.numbers.length === 0 && (
                  <div style={{ padding: '0 20px' }}>
                    {I18n.t('commons.not_available')}
                  </div>
                )
              }

              <div style={{ padding: '10px 20px' }}>
                <button
                  className="btn btn--secondary"
                  onClick={() => {
                    this.setState({ changeNumbers: true })
                  }}
                  type="button"
                >
                  {I18n.t('commons.edit_numbers')}
                </button>
              </div>
            </div>

            <Confirmation
              title={I18n.t('devices.delete')}
              message={this.state.data.name}
              reference={(el) => { this.contentDialog = el }}
            />
          </ContentPane>
        )
      }
    }
    return renderComponent
  }
}
/** Main propTypes */
Main.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  update: PropTypes.bool.isRequired,
}
