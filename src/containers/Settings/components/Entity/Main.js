import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'

class Main extends Component {

    render () {
        return (    
            <React.Fragment>
                <div className="title"> 
                    {I18n.t('commons.agent')}
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.token_life')}
                    </div>
                    <div className="controller">
                        <a onClick={() => this.props.changeMode("change Token life")}>{this.props.tokenLife} DAYS</a>
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.download_url')}
                        <div className="detail">{this.props.downloadURL}</div>
                    </div>

                    <div className="controller">
                        <button className="btn --secondary" onClick={() => this.props.changeMode("change download URL")}>
                            {I18n.t('commons.change')}
                        </button>
                    </div>
                </div>

                <div className="title"> 
                    {I18n.t('commons.configuration')}
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.id')}
                    </div>
                    <div className="controller">
                        {this.props.entityID}
                    </div>
                </div>

                <div className="title"> 
                    {I18n.t('settings.entity.general_information')}
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.devices_currently')}
                    </div>
                    <div className="controller">
                        {this.props.devicesCurretlymanaged}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.fleets_currently')}
                    </div>
                    <div className="controller">
                        {this.props.fleetsCurrentlyManaged}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.files_uploaded')}
                    </div>
                    <div className="controller">
                        {this.props.filesUploaded}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.applications_uploaded')}
                    </div>
                    <div className="controller">
                        {this.props.applicationsUploaded}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.number_of_users')}
                    </div>
                    <div className="controller">
                        {this.props.numberUsers}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.invitations_sent')}
                    </div>
                    <div className="controller">
                        {this.props.invitationsSent}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.types_of_policies')}
                    </div>
                    <div className="controller">
                        {this.props.typesPolicies}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('settings.entity.number_of_categories')}
                    </div>
                    <div className="controller">
                        {this.props.numberCategoriesForPolicies}
                    </div>
                </div>
            </React.Fragment>
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
    changeMode: PropTypes.func.isRequired
}

export default Main