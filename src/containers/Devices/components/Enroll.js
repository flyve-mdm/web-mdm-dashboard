import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'

export default class Enroll extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            email: ''
        }
    }

    inviteDevice = async () => {
        try {
            if (this.state.email.trim() !== "") {
                
                this.setState({
                    isLoading: true
                })
                
                await this.props.glpi.addItem({ itemtype: itemtype.PluginFlyvemdmInvitation, input: { _useremails: this.state.email.trim() } })
                
                this.setState({
                    isLoading: false
                })

                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.invitation_successfully_sent'),
                    type: 'success'
                })
                this.props.history.goBack()
                this.props.changeAction('reload')
            }
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({
                isLoading: false
            })
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (
                <Loading message={`${I18n.t('commons.loading')}...`} />
            )
        } else {
            renderComponent = (
                <ContentPane>
                    <div className="content-header" style={{ margin: '0 10px' }}>
                        <h2 className="content-header__title">
                            {I18n.t('devices.enroll.title')}
                        </h2>
                    </div>
                        <p>
                            {I18n.t('devices.enroll.insert_active_email')}
                        </p>
                        <p>
                            {I18n.t('devices.enroll.email_with_qr')}
                        </p>
                        <input
                            type="email"
                            className="win-textbox"
                            placeholder={I18n.t('commons.email')}
                            name="email"
                            value={this.state.email}
                            onChange={this.changeInput}
                            required
                        />
                        <br />
                        <button className="btn btn--secondary" onClick={() => this.props.history.goBack()}>
                            {I18n.t('commons.cancel')}
                        </button>
                        <button
                            className="btn btn--primary"
                            style={{ marginLeft: 10 }}
                            onClick={this.inviteDevice}
                        >
                            {I18n.t('commons.save')}
                        </button>
                </ContentPane >
            )
        }
        
        return renderComponent
    }
}
Enroll.propTypes = {
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
