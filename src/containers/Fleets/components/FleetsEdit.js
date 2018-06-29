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
 * @class FleetsEdit
 * @extends PureComponent
 */
class FleetsEdit extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      FieldList: [{
        name: I18n.t('commons.child_entities'),
        type: 'select',
        DBName: 'is_recursive',
        options: [{
          name: I18n.t('commons.yes'),
          value: true,
        },
        {
          name: I18n.t('commons.no'),
          value: false,
        },
        ],
      }],
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      selectedItems,
      changeAction,
      changeSelectionMode,
      history,
      setNotification,
      glpi,
    } = this.props
    const { FieldList } = this.state

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
          id: `${itemtype.PluginFlyvemdmFleet}.id`,
          itemtype: itemtype.PluginFlyvemdmFleet,
        }}
      />
    )
  }
}

FleetsEdit.defaultProps = {
  selectedItems: null,
}

FleetsEdit.propTypes = {
  selectedItems: PropTypes.array,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default FleetsEdit
