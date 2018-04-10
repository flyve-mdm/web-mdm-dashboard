import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import animations from '../../../../shared/animations'
import { changeLanguage } from '../../../../store/i18n/actions'
import { I18n } from 'react-i18nify'
import ContentPane from '../../../../components/ContentPane'

function mapDispatchToProps(dispatch) {
    const actions = {
        changeLanguage: bindActionCreators(changeLanguage, dispatch) 
    }
    return { actions }
}

class Display extends Component {

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

    changeLocalStorage = (name) => {
        this.setState({
            [name]: !this.state[name]
        })
    }

    componentDidUpdate  (){
        localStorage.setItem('display', JSON.stringify(this.state))
        animations(this.state.animations)
    }

    render () {
        return (
            <ContentPane>
                <h2 style={{marginBottom: '20px'}}>
                    {I18n.t('settings.display.title')}
                </h2>

                <div className="title"> 
                    {I18n.t('commons.language')}
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.change_interface')}
                    </div>
                    <div 
                        className="controller" 
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

                    <div className="listElement">
                        <div className="message">
                            {this.state.animations ? I18n.t('settings.display.disable_animations') : I18n.t('settings.display.enable_animations') }
                        </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch
                            className="content-text-primary"
                            checked={this.state.animations}
                            onChange={() => this.changeLocalStorage('animations')}
                        />
                    </div>
                </div>
                                        
                <div className="title">
                    {I18n.t('settings.display.show')}
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.devices_managed')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.devicesCurrentlyManaged}
                            onChange={() => this.changeLocalStorage('devicesCurrentlyManaged')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.fleets_managed')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.fleetsCurrentlyManaged}
                            onChange={() => this.changeLocalStorage('fleetsCurrentlyManaged')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.files_uploaded')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.filesUploaded}
                            onChange={() => this.changeLocalStorage('filesUploaded')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.applications_uploaded')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.applicationsUploaded}
                            onChange={() => this.changeLocalStorage('applicationsUploaded')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.users')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.numberUsers}
                            onChange={() => this.changeLocalStorage('numberUsers')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.invitations_sent')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.invitationsSent}
                            onChange={() => this.changeLocalStorage('invitationsSent')}
                        />
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.pending_invitations')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.pendingInvitations}
                            onChange={() => this.changeLocalStorage('pendingInvitations')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.devices_by_users')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.devicesByUsers}
                            onChange={() => this.changeLocalStorage('devicesByUsers')}
                        />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.display.devices_by_system')}
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
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
