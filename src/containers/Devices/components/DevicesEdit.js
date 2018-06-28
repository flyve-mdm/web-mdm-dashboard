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
  I18n,
} from 'react-i18nify'
import EditMultiple from '../../../components/EditMultiple'
import itemtype from '../../../shared/itemtype'

/**
 * @class DevicesEdit
 * @extends PureComponent
 */
export default class DevicesEdit extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      FieldList: [{
        name: I18n.t('commons.fleet'),
        type: 'select',
        DBName: 'plugin_flyvemdm_fleets_id',
        params: {
          itemtype: itemtype.PluginFlyvemdmFleet,
          options: {
            forcedisplay: [2],
          },
        },
        method: 'searchItems',
        content: '1',
        value: '2',
      }],
    }
  }

  render() {
    const { FieldList } = this.state
    const {
      selectedItems,
      changeAction,
      changeSelectionMode,
      history,
      setNotification,
      glpi,
    } = this.props

    return (
      <EditMultiple
        selectedItems={selectedItems}
        FieldList={FieldList}
        changeAction={changeAction}
        changeSelectionMode={changeSelectionMode}
        history={history}
        setNotification={setNotification}
        glpi={glpi}
        request={{
          id: 'PluginFlyvemdmAgent.id',
          itemtype: itemtype.PluginFlyvemdmAgent,
        }}
      />
    )
  }
}

DevicesEdit.defaultProps = {
  selectedItems: undefined,
}

/** DevicesEdit propTypes */
DevicesEdit.propTypes = {
  selectedItems: PropTypes.array,
  changeSelectionMode: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
