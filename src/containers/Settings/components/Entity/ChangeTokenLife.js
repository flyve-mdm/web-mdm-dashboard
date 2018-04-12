import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { uiSetNotification } from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { I18n } from 'react-i18nify'
import Loading from '../../../../components/Loading'
import itemtype from '../../../../shared/itemtype'
import ContentPane from '../../../../components/ContentPane'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class ChangeTokenLife extends Component {

    constructor (props) {
        super (props)
        this.state = {
            tokenLife: this.props.tokenLife,
            isLoading: false
        }
    }

    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveTokenLife = () => {
        this.setState({
            isLoading: true
        }, async () => {
            try {
                await this.props.glpi.updateItem({
                    itemtype: itemtype.PluginFlyvemdmEntityconfig,
                    id: this.props.entityID,
                    input: {
                        agent_token_life: `P${this.state.tokenLife}D`
                    }
                })
                this.props.saveValues('tokenLife', this.state.tokenLife)
                this.props.changeMode('')
                this.props.actions.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.token_life_changed'),
                    type: 'success'
                })
            } catch (error) {
                this.props.actions.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({ isLoading: false })
            }
        })
    }

    render () {
        return this.state.isLoading ? <Loading message={`${I18n.t('commons.saving')}...`}/>: 
            ( 
                <ContentPane>
                    <div className="listElement">
                        {I18n.t('settings.entity.date_period')}
                        <div className="detail">
                            {I18n.t('settings.entity.number_of_days')}
                        </div>
                    </div>
                    <div className="listElement">
                        <input 
                            type="number" 
                            className="win-textbox" 
                            name="tokenLife"
                            value={this.state.tokenLife}
                            onChange={this.changeState}
                        />
                    </div>
                    <button className="btn --secondary" style={{marginRight: 10}} onClick={() => this.props.changeMode("")}>
                        {I18n.t('commons.cancel')}
                    </button>
                    <button className="btn --primary" onClick={this.saveTokenLife}>
                        {I18n.t('commons.save')}
                    </button>
                </ContentPane>
            )
    }
}

ChangeTokenLife.propTypes = {
    changeMode: PropTypes.func.isRequired,
    tokenLife: PropTypes.string.isRequired,
    saveValues: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired,
    entityID: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(ChangeTokenLife)
