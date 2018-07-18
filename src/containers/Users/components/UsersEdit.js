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
import EditMultiple from '../../../components/EditMultiple'
import itemtype from '../../../shared/itemtype'

/**
 * Component with the form of massive edition of users
 * @class DevicesEdit
 * @extends PureComponent
 */
class DevicesEdit extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      FieldList: [{
        name: I18n.t('commons.realname'),
        type: 'text',
        DBName: 'realname',
      },
      {
        name: I18n.t('commons.first_name'),
        type: 'text',
        DBName: 'firstname',
      },
      {
        name: I18n.t('commons.phone'),
        type: 'text',
        DBName: 'phone',
      },
      {
        name: I18n.t('commons.phone_2'),
        type: 'text',
        DBName: 'phone2',
      },
      {
        name: I18n.t('commons.mobile_phone'),
        type: 'text',
        DBName: 'mobile',
      },
      {
        name: I18n.t('commons.administrative_number'),
        type: 'text',
        DBName: 'registration_number',
      },
      {
        name: I18n.t('commons.password'),
        type: 'password',
        DBName: ['password', 'password2'],
      },
      {
        name: I18n.t('commons.title'),
        type: 'select',
        DBName: 'usertitles_id',
        params: {
          itemtype: itemtype.UserTitle,
          options: {
            range: '0-200',
            forcedisplay: [2],
          },
        },
        method: 'searchItems',
        content: '1',
        value: '2',
      },
      {
        name: I18n.t('commons.location'),
        type: 'select',
        DBName: 'locations_id',
        params: {
          itemtype: itemtype.Location,
          options: {
            range: '0-200',
            forcedisplay: [2],
          },
        },
        method: 'searchItems',
        content: '1',
        value: '2',
      },
      {
        name: I18n.t('commons.default_profile'),
        type: 'select',
        DBName: 'profiles_id',
        params: {},
        method: 'getMyProfiles',
        content: 'name',
        value: 'id',
      },
      {
        name: I18n.t('commons.category'),
        type: 'select',
        DBName: 'usercategories_id',
        params: {
          itemtype: itemtype.UserCategory,
          options: {
            range: '0-200',
            forcedisplay: [2],
          },
        },
        method: 'searchItems',
        content: '1',
        value: '2',
      },
      {
        name: I18n.t('commons.default_entity'),
        type: 'select',
        DBName: 'entities_id',
        params: {},
        method: 'getMyEntities',
        content: 'name',
        value: 'id',
      },
      {
        name: I18n.t('commons.valid_since'),
        type: 'datePicker',
        DBName: 'begin_date',
      },
      {
        name: I18n.t('commons.valid_until'),
        type: 'datePicker',
        DBName: 'end_date',
      },
      {
        name: I18n.t('commons.comments'),
        type: 'textArea',
        DBName: 'comment',
      },
      ],
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <EditMultiple
        selectedItems={this.props.selectedItems}
        FieldList={this.state.FieldList}
        changeAction={this.props.changeAction}
        changeSelectionMode={this.props.changeSelectionMode}
        history={this.props.history}
        toast={this.props.toast}
        glpi={this.props.glpi}
        request={{
          id: 'User.id',
          itemtype: itemtype.User,
        }}
      />
    )
  }
}

DevicesEdit.defaultProps = {
  selectedItems: null,
}

DevicesEdit.propTypes = {
  selectedItems: PropTypes.array,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default DevicesEdit
