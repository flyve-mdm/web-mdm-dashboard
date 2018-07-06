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
import ReactWinJS from 'react-winjs'
import I18n from '../../../shared/i18n'
import ContentPane from '../../../components/ContentPane'
import {
  DangerZone,
  Main,
  SystemReport,
  Applications,
  Geolocation,
} from './Sections'
import getID from '../../../shared/getID'
import Confirmation from '../../../components/Confirmation'
import FleetsContent from '../../Fleets/components/FleetsContent'
import itemtype from '../../../shared/itemtype'

/**
 * @class DevicesContent
 * @extends PureComponent
 */
export default class DevicesContent extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const { history } = this.props

    this.state = {
      id: getID(history.location.pathname),
      selectedIndex: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== getID(nextProps.history.location.pathname)) {
      return {
        ...prevState,
        id: getID(nextProps.history.location.pathname),
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle change selected item
   * @function changeselectedItem
   * @param {object} pivot
   */
  changeselectedItem = (pivot) => {
    const { selectedIndex } = this.state

    if (pivot) {
      if (pivot.winControl.selectedIndex !== selectedIndex) {
        this.setState({
          selectedIndex: pivot.winControl.selectedIndex,
        })
      }
      /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["pivot"] }] */
      pivot.winControl.onselectionchanged = (event) => {
        this.setState({
          selectedIndex: event.detail.index,
        })
      }
    }
  }

  render() {
    const {
      changeAction,
      changeSelectionMode,
      toast,
      handleMessage,
      history,
      glpi,
      selectedItems,
    } = this.props
    const {
      selectedIndex,
      id,
    } = this.state

    return (
      <React.Fragment>
        <Confirmation
          title={I18n.t('devices.danger_zone.last_warning')}
          message={I18n.t('devices.danger_zone.last_warning_message')}
          reference={(el) => { this.wipeDevice = el }}
        />
        <Confirmation
          title={`${I18n.t('devices.danger_zone.unenroll_device')} # ${id}`}
          message={`${I18n.t('devices.danger_zone.going_to_unenroll')} ${id}`}
          reference={(el) => { this.unenrollmentDevice = el }}
        />
        <Confirmation
          title={`${I18n.t('devices.danger_zone.delete')} # ${id}`}
          message={`${I18n.t('devices.danger_zone.delete_message')} ${id}`}
          reference={(el) => { this.deleteDevice = el }}
        />
        <ContentPane className="devices">
          <ReactWinJS.Pivot ref={this.changeselectedItem}>
            <ReactWinJS.Pivot.Item key="main" header={I18n.t('devices.main.title')}>
              <Main
                id={id}
                changeAction={changeAction}
                changeSelectionMode={changeSelectionMode}
                toast={toast}
                handleMessage={handleMessage}
                history={history}
                glpi={glpi}
                update={selectedIndex === 0}
              />
            </ReactWinJS.Pivot.Item>
            <ReactWinJS.Pivot.Item key="systemReport" header={I18n.t('devices.system_report.title')}>
              <SystemReport
                id={id}
                glpi={glpi}
                toast={toast}
                handleMessage={handleMessage}
                update={selectedIndex === 1}
              />
            </ReactWinJS.Pivot.Item>
            <ReactWinJS.Pivot.Item key="applications" header={I18n.t('devices.applications.title')}>
              <Applications
                id={id}
                glpi={glpi}
                handleMessage={handleMessage}
                update={selectedIndex === 2}
              />
            </ReactWinJS.Pivot.Item>
            <ReactWinJS.Pivot.Item key="policies" header={I18n.t('devices.policies.title')}>
              <FleetsContent
                {...this.props}
                itemType={itemtype.PluginFlyvemdmAgent}
                selectedItems={selectedItems}
                update={selectedIndex === 3}
              />
            </ReactWinJS.Pivot.Item>
            <ReactWinJS.Pivot.Item key="geolocation" header={I18n.t('devices.geolocation.title')}>
              <Geolocation
                id={id}
                toast={toast}
                handleMessage={handleMessage}
                glpi={glpi}
                update={selectedIndex === 4}
              />
            </ReactWinJS.Pivot.Item>
            <ReactWinJS.Pivot.Item key="dangerZone" header={I18n.t('devices.danger_zone.title')}>
              <DangerZone
                id={id}
                changeAction={changeAction}
                toast={toast}
                handleMessage={handleMessage}
                glpi={glpi}
                history={history}
                wipeDevice={this.wipeDevice}
                unenrollmentDevice={this.unenrollmentDevice}
                deleteDevice={this.deleteDevice}
                update={selectedIndex === 5}
              />
            </ReactWinJS.Pivot.Item>
          </ReactWinJS.Pivot>
        </ContentPane>
      </React.Fragment>
    )
  }
}

DevicesContent.defaultProps = {
  selectedItems: undefined,
}

/** DevicesContent propTypes */
DevicesContent.propTypes = {
  changeSelectionMode: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
  selectedItems: PropTypes.array,
}
