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

/**
 * Component with the 'Main' page of the entity section
 * @class Main
 * @extends PureComponent
 */
class Main extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <>
        <div className="title" style={{ padding: '0 10px' }}>
          {I18n.t('commons.agent')}
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.token_life')}
          </div>
          <div className="list-element__controller">
            <button
              className="btn btn-link"
              onClick={() => this.props.changeMode('change Token life')}
              type="button"
            >
              {this.props.tokenLife}
              {' '}
              DAYS
            </button>
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.download_url')}
            <div className="list-element__detail">
              {this.props.downloadURL}
            </div>
          </div>

          <div className="list-element__controller">
            <button
              className="btn btn--secondary"
              onClick={() => this.props.changeMode('change download URL')}
              type="button"
            >
              {I18n.t('commons.change')}
            </button>
          </div>
        </div>

        <div className="title">
          {I18n.t('commons.configuration')}
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.id')}
          </div>
          <div className="list-element__controller">
            {this.props.entityID}
          </div>
        </div>

        <div className="title">
          {I18n.t('settings.entity.general_information')}
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.devices_currently')}
          </div>
          <div className="list-element__controller">
            {this.props.devicesCurretlymanaged}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.fleets_currently')}
          </div>
          <div className="list-element__controller">
            {this.props.fleetsCurrentlyManaged}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.files_uploaded')}
          </div>
          <div className="list-element__controller">
            {this.props.filesUploaded}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.applications_uploaded')}
          </div>
          <div className="list-element__controller">
            {this.props.applicationsUploaded}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.number_of_users')}
          </div>
          <div className="list-element__controller">
            {this.props.numberUsers}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.invitations_sent')}
          </div>
          <div className="list-element__controller">
            {this.props.invitationsSent}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.types_of_policies')}
          </div>
          <div className="list-element__controller">
            {this.props.typesPolicies}
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.entity.number_of_categories')}
          </div>
          <div className="list-element__controller">
            {this.props.numberCategoriesForPolicies}
          </div>
        </div>
      </>
    )
  }
}

Main.propTypes = {
  tokenLife: PropTypes.string.isRequired,
  numberCategoriesForPolicies: PropTypes.string.isRequired,
  typesPolicies: PropTypes.string.isRequired,
  invitationsSent: PropTypes.string.isRequired,
  numberUsers: PropTypes.string.isRequired,
  applicationsUploaded: PropTypes.string.isRequired,
  filesUploaded: PropTypes.string.isRequired,
  fleetsCurrentlyManaged: PropTypes.string.isRequired,
  devicesCurretlymanaged: PropTypes.string.isRequired,
  entityID: PropTypes.string.isRequired,
  downloadURL: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
}

export default Main
