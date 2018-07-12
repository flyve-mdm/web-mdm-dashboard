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
import {
  supervisionScheme,
} from '../../../../components/Forms/Schemas'
import validateData from '../../../../shared/validateData'
import ConstructInputs from '../../../../components/Forms'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import itemtype from '../../../../shared/itemtype'

/**
 * Component with the supervision section
 * @class Supervision
 * @extends PureComponent
 */
class Supervision extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      website: '',
      email: '',
      address: '',
      entityID: '',
      isLoading: true,
    }
  }

  /**
   * Get the supervision information from glpi
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const {
        active_profile: activeProfile,
      } = await this.props.glpi.getActiveProfile()
      let entityID
      if (Array.isArray(activeProfile.entities)) {
        entityID = activeProfile.entities[0].id
      } else {
        for (const key in activeProfile.entities) {
          if (Object.prototype.hasOwnProperty.call(activeProfile.entities, key)) {
            entityID = activeProfile.entities[key].id
          }
        }
      }
      const entity = await this.props.glpi.getAnItem({
        itemtype: itemtype.Entity,
        id: entityID,
      })
      this.setState({
        isLoading: false,
        entityID,
        name: validateData(entity.name),
        phone: validateData(entity.phonenumber),
        website: validateData(entity.website),
        email: validateData(entity.email),
        address: validateData(entity.address),
      })
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

  /**
   * Save the new values in glpi
   * @function saveChanges
   */
  saveChanges = () => {
    const {
      name,
      entityID,
      phone,
      website,
      email,
      address,
    } = this.state

    this.setState({
      isLoading: true,
    }, async () => {
      try {
        await this.props.glpi.updateItem({
          itemtype: itemtype.Entity,
          id: `${entityID}`,
          input: {
            phonenumber: phone,
            name,
            website,
            email,
            address,
          },
        })
        this.setState({
          isLoading: false,
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.helpdesk_configuration_saved'),
          type: 'success',
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
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
   * Handle set state
   * @function changeState
   * @param {string} name
   * @param {string} value
   */
  changeState = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const { isLoading } = this.state

    const supervision = supervisionScheme({
      state: this.state,
      changeState: this.changeState,
    })

    return (
      isLoading
        ? <Loading message={`${I18n.t('commons.loading')}...`} />
        : (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('settings.supervision.title')}
            </h2>
            <div className="list-content" style={{ margin: '10px' }}>
              <ConstructInputs
                data={supervision.helpDeskInformation}
                icon="supervisionIcon"
                title={I18n.t('settings.supervision.helpdesk')}
              />
              <div style={{ overflow: 'auto', paddingBottom: 40 }}>
                <button
                  className="btn btn--primary"
                  style={{ marginRight: '20px', float: 'right' }}
                  onClick={this.saveChanges}
                  type="button"
                >
                  {I18n.t('commons.save')}
                </button>
              </div>
            </div>
          </ContentPane>
        )
    )
  }
}

Supervision.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  glpi: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withGLPI(Supervision)
