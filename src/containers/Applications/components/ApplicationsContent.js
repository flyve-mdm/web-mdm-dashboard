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
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'
import BytesToSize from 'shared/bytesToSize'
import itemtype from 'shared/itemtype'
import getID from 'shared/getID'
import publicURL from 'shared/publicURL'
import ContentPane from 'components/ContentPane'
import IconItemList from 'components/IconItemList'
import Confirmation from 'components/Confirmation'
import Loading from 'components/Loading'

/**
 * @class ApplicationsContent
 * @extends PureComponent
 */
export default class ApplicationsContent extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      id: getID(this.props.history.location.pathname),
      data: undefined,
    }
  }

  /**
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleRefresh()
  }

  /**
   * Update the content when it's necessary
   * @function componentDidUpdate
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      this.handleRefresh()
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== getID(nextProps.history.location.pathname)) {
      return {
        id: getID(nextProps.history.location.pathname),
        data: undefined,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * Handle delete current application
   * @async
   * @function handleDelete
   */
  handleDelete = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      const itemListToDelete = [{ id: this.state.id }]

      this.setState({
        isLoading: true,
      })
      try {
        await this.props.glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmPackage,
          input: itemListToDelete,
          queryString: {
            force_purge: true,
          },
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.elements_successfully_removed'),
          type: 'success',
        })
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false)
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
  }

  /**
   * Handle refresh selected application
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    try {
      const { id } = this.state
      const data = await this.props.glpi.getAnItem({
        itemtype: itemtype.PluginFlyvemdmPackage,
        id,
      })
      this.setState({
        data,
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.props.history.push(`${publicURL}/app/applications`)
    }
  }

  render() {
    if (this.state.isLoading || this.state.data === undefined) {
      return (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    }
    let image
    if (this.state.data.icon) {
      image = (
        <IconItemList
          size={this.props.size}
          image={`data:image/png;base64, ${this.state.data.icon}`}
          type="base64"
          backgroundColor="transparent"
        />
      )
    } else {
      image = (
        <div
          style={{
            display: 'inline-block',
            width: 72,
            height: 72,
            fontSize: '40px',
            textAlign: 'center',
          }}
        >
          <Icon iconName="Page" />
        </div>
      )
    }
    return (
      <ContentPane>
        <div className="content-header" style={{ margin: '0 10px' }}>
          <h2 style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}>
            {I18n.t('applications.title')}
          </h2>
          <div className="item-info">
            {image}
            <div>
              <div className="item-info__name">
                {this.state.data.alias}
              </div>
              <div className="item-info__detail">
                {this.state.data.name}
              </div>
              <div className="item-info__detail">
                {BytesToSize(this.state.data.filesize)}
              </div>
              <span className="item-info__source">
                {this.state.data.source}
              </span>
              <br />
              <div>
                <Icon
                  iconName="Edit"
                  style={{ marginRight: '20px', fontSize: '20px' }}
                  onClick={() => this.props.history.push(`${publicURL}/app/applications/${this.state.id}/edit`)}
                />
                <Icon
                  iconName="Delete"
                  style={{ marginRight: '20px', fontSize: '20px' }}
                  onClick={this.handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="separator" />
        <Confirmation
          title={I18n.t('applications.delete')}
          message={this.state.data.name}
          reference={(el) => { this.contentDialog = el }}
        />
      </ContentPane>
    )
  }
}

/** ApplicationsContent defaultProps */
ApplicationsContent.defaultProps = {
  size: undefined,
}

/** ApplicationsContent propTypes */
ApplicationsContent.propTypes = {
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  size: PropTypes.number,
  history: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}
