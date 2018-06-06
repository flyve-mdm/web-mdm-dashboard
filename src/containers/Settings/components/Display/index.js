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
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import animationsWinJs from '../../../../shared/animationsWinJs'
import { changeLanguage } from '../../../../store/i18n/actions'
import { I18n } from 'react-i18nify'
import ContentPane from '../../../../components/ContentPane'

function mapDispatchToProps(dispatch) {
    const actions = {
        changeLanguage: bindActionCreators(changeLanguage, dispatch) 
    }
    return { actions }
}

/**
 * Component with the display section
 * @class Display
 * @extends PureComponent
 */
class Display extends PureComponent {
    /** @constructor */
    constructor(props) {
        super(props)
        const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
        this.state = {
            applicationsUploaded: display.applicationsUploaded !== undefined ? display.applicationsUploaded : true,
            devicesByOperatingSystemVersion: display.devicesByOperatingSystemVersion !== undefined ? display.devicesByOperatingSystemVersion : true,
            devicesByUsers: display.devicesByUsers !== undefined ? display.devicesByUsers : true,
            devicesCurrentlyManaged: display.devicesCurrentlyManaged !== undefined ? display.devicesCurrentlyManaged : true,
            filesUploaded: display.filesUploaded !== undefined ? display.filesUploaded : true,
            fleetsCurrentlyManaged: display.fleetsCurrentlyManaged !== undefined ? display.fleetsCurrentlyManaged : true,
            invitationsSent: display.invitationsSent !== undefined ? display.invitationsSent: true,
            numberUsers: display.numberUsers !== undefined ? display.numberUsers: true,
            animations: display.animations !== undefined ? display.animations : true,
            pendingInvitations: display.pendingInvitations !== undefined ? display.pendingInvitations: true,
        }
    }

    /**
     * Handle change state
     * @function changeLocalStorage
     * @param {string} name
     */
    changeLocalStorage = (name) => {
        this.setState({
            [name]: !this.state[name]
        })
    }

    /**
     * Change local storage
     * @function componentDidUpdate
     */
    componentDidUpdate() {
        localStorage.setItem('display', JSON.stringify(this.state))
        animationsWinJs(this.state.animations)
    }

    /** 
     * Render component 
     * @function render
     */ 
    render () {
        return (
            <ContentPane>
                <h2 style={{ margin: '10px' }}>
                    {I18n.t('settings.display.title')}
                </h2>

                <div className="title"> 
                    {I18n.t('commons.language')}
                </div>

                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.change_interface')}
                    </div>
                    <div 
                        className="list-element__controller" 
                        style={{
                            paddingTop: 10
                        }}
                    >
                        <span className='language__span btn' style={{margin: 0}}>
                            {I18n.t('commons.language')}
                            <select 
                                className='language__select' 
                                onChange={event => this.props.actions.changeLanguage(event.target.value)}
                            >
                                <option value='en_GB'>
                                    {I18n.t('commons.english')}
                                </option>
                                <option value='pt_BR'>
                                    {I18n.t('commons.portuguese')}
                                </option>
                                <option value='fr_FR'>
                                    {I18n.t('commons.french')}
                                </option>
                                <option value='es_ES'>
                                    {I18n.t('commons.spanish')}
                                </option>
                            </select>
                        </span>
                    </div>
                </div>

                <div className="title"> 
                    {I18n.t('commons.animations')}
                </div>

                    <div className="list-element">
                        <div className="list-element__message">
                            {this.state.animations ? I18n.t('settings.display.disable_animations') : I18n.t('settings.display.enable_animations') }
                        </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch
                            className="files-list__content-text-primary"
                            checked={this.state.animations}
                            onChange={() => this.changeLocalStorage('animations')}
                        />
                    </div>
                </div>
                                        
                <div className="title">
                    {I18n.t('settings.display.show')}
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.devices_managed')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.devicesCurrentlyManaged}
                            onChange={() => this.changeLocalStorage('devicesCurrentlyManaged')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.fleets_managed')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.fleetsCurrentlyManaged}
                            onChange={() => this.changeLocalStorage('fleetsCurrentlyManaged')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.files_uploaded')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.filesUploaded}
                            onChange={() => this.changeLocalStorage('filesUploaded')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.applications_uploaded')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.applicationsUploaded}
                            onChange={() => this.changeLocalStorage('applicationsUploaded')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.users')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.numberUsers}
                            onChange={() => this.changeLocalStorage('numberUsers')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.invitations_sent')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.invitationsSent}
                            onChange={() => this.changeLocalStorage('invitationsSent')}
                        />
                    </div>
                </div>

                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.pending_invitations')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.pendingInvitations}
                            onChange={() => this.changeLocalStorage('pendingInvitations')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.devices_by_users')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.devicesByUsers}
                            onChange={() => this.changeLocalStorage('devicesByUsers')}
                        />
                    </div>
                </div>
                
                <div className="list-element">
                    <div className="list-element__message">
                        {I18n.t('settings.display.devices_by_system')}
                    </div>
                    <div className="list-element__controller">
                        <ReactWinJS.ToggleSwitch 
                            className="files-list__content-text-primary"
                            checked={this.state.devicesByOperatingSystemVersion}
                            onChange={() => this.changeLocalStorage('devicesByOperatingSystemVersion')}
                        />
                    </div>
                </div>
                
            </ContentPane>
        )
    }
}

Display.propTypes = {
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(Display)
