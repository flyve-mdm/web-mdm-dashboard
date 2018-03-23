import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { uiToggleAnimation } from '../../../../store/ui/actions'
import { changeLanguage } from '../../../../store/i18n/actions'
import { I18n } from 'react-i18nify'

function mapDispatchToProps(dispatch) {
    const actions = {
        uiToggleAnimation: bindActionCreators(uiToggleAnimation, dispatch),
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
            animations: display.animations !== undefined ? display.animations : true 
        }
    }

    changeLocalStorage = (name) => {
        this.setState({
            [name]: !this.state[name]
        })

        if (name === 'animations') {
            this.props.actions.uiToggleAnimation()
        }
    }

    componentDidUpdate  (){
        localStorage.setItem('display', JSON.stringify(this.state))
    }

    render () {
        return (
            <div>
                <h2 style={{marginBottom: '20px'}}>Supervision</h2>

                <div className="win-h3"> Language </div>

                <div className="listElement">
                    <div className="message">
                        Change interface language
                    </div>
                    <div 
                    className="controller" 
                    style={{
                        paddingTop: 10
                    }}>
                        <span className='language__span btn' style={{margin: 0}}>
                            {I18n.t('commons.language')}
                            <select className='language__select' onChange={
                                event => this.props.actions.changeLanguage(event.target.value)
                            }>
                                <option value='en_GB'>English</option>
                                <option value='pt_BR'>Portuguese</option>
                                <option value='fr_FR'>French</option>
                                <option value='es_ES'>Spain</option>
                            </select>
                        </span>
                    </div>
                </div>

                <div className="win-h3"> Animations </div>

                    <div className="listElement">
                        <div className="message">
                        {this.state.animations ? 'Disable animations' : 'Enable animations' }
                        </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch
                        className="content-text-primary"
                            checked={this.state.animations}
                            onChange={() => this.changeLocalStorage('animations')}
                        />
                    </div>
                </div>
                                        
                <div className="win-h3">Show in dashboard </div>
                
                <div className="listElement">
                    <div className="message">
                        Devices currently managed
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
                        Fleets currently managed
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
                        Files uploaded
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
                        Applications uploaded   
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
                        Number of users
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
                        Invitations sent
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
                        Devices by users
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
                        Devices by Operating System version
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.devicesByOperatingSystemVersion}
                                onChange={() => this.changeLocalStorage('devicesByOperatingSystemVersion')}
                            />
                    </div>
                </div>
                
            </div>
        )
    }
}

Display.propTypes = {
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(Display)
