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
import I18n from '../../../../shared/i18n'
import PropTypes from 'prop-types'
import ChangeDownloadURL from './ChangeDownloadURL'
import ChangeTokenLife from './ChangeTokenLife'
import Main from './Main'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import itemtype from '../../../../shared/itemtype'

/**
 * Component with the entity section
 * @class Entity
 * @extends PureComponent
 */
class Entity extends PureComponent {
/** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      mode: '',
      tokenLife: '',
      downloadURL: '',
      entityID: '',
      devicesCurretlymanaged: '',
      fleetsCurrentlyManaged: '',
      filesUploaded: '',
      applicationsUploaded: '',
      numberUsers: '',
      invitationsSent: '',
      typesPolicies: '',
      numberCategoriesForPolicies: '',
    }
  }

  /**
   * Get all necessary data from glpi
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    const {
      glpi,
      handleMessage,
    } = this.props

    try {
      const devices = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmAgent,
      })
      const applications = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPackage,
      })
      const users = await glpi.searchItems({
        itemtype: itemtype.User,
      })
      const invitations = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitation,
      })
      const files = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFile,
      })
      const fleets = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
      })
      const policies = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPolicy,
      })
      const policyCategories = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPolicyCategory,
      })
      const {
        active_profile: activeProfile,
      } = await glpi.getActiveProfile()
      let entityID
      if (Array.isArray(activeProfile.entities)) {
        entityID = activeProfile.entities[0].id
      } else {
        for (const key in activeProfile.entities) {
          if (Object.prototype.hasOwnProperty.call(activeProfile.entities, key)) {
            entityID = `${activeProfile.entities[key].id}`
          }
        }
      }

      let entityconfig = await glpi.getAnItem({
        itemtype: itemtype.PluginFlyvemdmEntityconfig,
        id: entityID,
      })

      if (Array.isArray(entityconfig)) entityconfig = { ...entityconfig[0] }

      const tokenLifeMatch = entityconfig.agent_token_life.match(/\d+/)

      const downloadURL = entityconfig.download_url

      this.setState({
        isLoading: false,
        entityID: `${entityID}`,
        devicesCurretlymanaged: `${devices.totalcount}`,
        applicationsUploaded: `${applications.totalcount}`,
        numberUsers: `${users.totalcount}`,
        invitationsSent: `${invitations.totalcount}`,
        filesUploaded: `${files.totalcount}`,
        fleetsCurrentlyManaged: `${fleets.totalcount}`,
        typesPolicies: `${policies.totalcount}`,
        numberCategoriesForPolicies: `${policyCategories.totalcount}`,
        tokenLife: tokenLifeMatch ? tokenLifeMatch[0] : 0,
        downloadURL: downloadURL || 'https://',
      })
    } catch (error) {
      this.props.toast.setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
    }
  }

  /**
   * Change mode
   * @function changeMode
   * @param {string} mode
   */
  changeMode = (mode) => {
    this.setState({
      mode,
    })
  }

  /**
   * Handle set state
   * @function saveValues
   * @param {string} name
   * @param {string} value
   */
  saveValues = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      mode,
      tokenLife,
      entityID,
      downloadURL,
      numberCategoriesForPolicies,
      typesPolicies,
      invitationsSent,
      numberUsers,
      applicationsUploaded,
      filesUploaded,
      fleetsCurrentlyManaged,
      devicesCurretlymanaged,
      isLoading,
    } = this.state
    const {
      handleMessage,
      glpi,
      toast,
    } = this.props

    let content
    switch (mode) {
      case 'change Token life':
        content = (
          <ChangeTokenLife
            changeMode={this.changeMode}
            tokenLife={tokenLife}
            saveValues={this.saveValues}
            handleMessage={handleMessage}
            glpi={glpi}
            toast={toast}
            entityID={entityID}
          />
        )

        break

      case 'change download URL':
        content = (
          <ChangeDownloadURL
            changeMode={this.changeMode}
            downloadURL={downloadURL}
            saveValues={this.saveValues}
            toast={toast}
            handleMessage={handleMessage}
            glpi={glpi}
            entityID={entityID}
          />
        )

        break

      default:
        content = (
          <ContentPane>
            <Main
              tokenLife={tokenLife}
              numberCategoriesForPolicies={numberCategoriesForPolicies}
              typesPolicies={typesPolicies}
              invitationsSent={invitationsSent}
              numberUsers={numberUsers}
              applicationsUploaded={applicationsUploaded}
              filesUploaded={filesUploaded}
              fleetsCurrentlyManaged={fleetsCurrentlyManaged}
              devicesCurretlymanaged={devicesCurretlymanaged}
              entityID={entityID}
              downloadURL={downloadURL}
              changeMode={this.changeMode}
              handleMessage={handleMessage}
              toast={toast}
            />
          </ContentPane>
        )
    }

    return (
      isLoading
        ? (
          <Loading message={`${I18n.t('commons.loading')}...`} />
        )
        : (
          <React.Fragment>
            <h2 style={{ margin: 10 }}>
              { I18n.t('settings.entity.title') }
            </h2>
            <div style={{ marginTop: '10px', height: '100%' }}>
              {content}
            </div>
          </React.Fragment>
        )
    )
  }
}

Entity.propTypes = {
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(Entity)
