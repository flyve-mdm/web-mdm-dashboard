import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import ConstructInputs from '../../../components/Forms'
import { agentScheme } from '../../../components/Forms/Schemas'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'
import publicURL from "../../../shared/publicURL"
import getID from "../../../shared/getID"

export default class DevicesEditOne extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            id: getID(this.props.history.location.pathname, 3)
        }
    }

    componentDidMount() {
        if (Number(this.state.id)) {
            this.handleRefresh()
        } else {
            this.props.history.push(`${publicURL}/app/devices`);
        }
    }

    handleRefresh = () => {
        this.props.glpi.getAnItem({ itemtype: itemtype.PluginFlyvemdmAgent, id: this.state.id })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    id: response["id"],
                    name: response["name"],
                    fleet: {
                        value: response["plugin_flyvemdm_fleets_id"],
                        request: {
                            params: {itemtype: itemtype.PluginFlyvemdmFleet, options: {forcedisplay: [2]}},
                            method: 'searchItems',
                            content: '1',
                            value: '2'
                        }
                    }
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    id: null,
                    name: '',
                    fleet: {
                        value: '',
                        request: {
                            params: {itemtype: itemtype.PluginFlyvemdmFleet, options: {forcedisplay: [2]}},
                            method: 'searchItems',
                            content: '1',
                            value: '2'
                        }
                    }
                })
            })
    }

    changeState = (name, value) => {
        if(name === 'fleet') {
            this.setState({
                [name]: {...this.state[name], value}
            })
        } else {
            this.setState({
                [name]: value
            })
        }   
    }

    handleSaveOneDevices = () => {
        this.setState({
            isLoading: true
        })
        const input = {
            name: this.state.name,
            plugin_flyvemdm_fleets_id: this.state.fleet.value
        }
        this.props.glpi.updateItem({itemtype: itemtype.PluginFlyvemdmAgent, id: this.state.id, input})
            .then(() => {
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.changes_saved_successfully'),
                    type: 'success'
                })
                this.props.changeAction('reload')
                this.props.changeSelectionMode(false);
                this.props.history.push(`${publicURL}/app/devices/${this.state.id}`);
            })
            .catch((error) => {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({
                    isLoading: false
                })
            })
    }
    
    render() {
        const componetRender = (
            <ContentPane>
                <Loading message={`${I18n.t('commons.loading')}...`} />
            </ContentPane>
        ) 

        if(!this.state) {
            return componetRender
        } else {
            const agent = this.state.name ? agentScheme({
                state: this.state, 
                changeState: this.changeState,
                glpi: this.props.glpi
            }) : null

            if(agent && !this.state.isLoading) {
                return (
                    <ContentPane>
                        <div className="content-header">
                            <button className="btn btn--primary" onClick={this.handleSaveOneDevices}>
                                {I18n.t('commons.save')}
                            </button>
                        </div>
                        <div className="separator" />
                        <ConstructInputs data={agent.mainInformation} />
                    </ContentPane>
                )
            } else {
                return componetRender
            }   
        }
    }
}
DevicesEditOne.propTypes = {
    selectedItems: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
