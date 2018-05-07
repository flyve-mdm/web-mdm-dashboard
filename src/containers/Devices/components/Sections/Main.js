import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconItemList from '../../../../components/IconItemList'
import Confirmation from '../../../../components/Confirmation'
import Loading from '../../../../components/Loading'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'
import publicURL from '../../../../shared/publicURL'

export default class Main extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            sendingPing: false
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItems !== prevProps.selectedItems) {
            this.setState({
                data: undefined
            })
            this.handleRefresh()
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id || this.props.update !== newProps.update) {
            this.setState({
                data: undefined
            }, () => this.handleRefresh())
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        if (this.props.update) {
            try {
                this.setState({ 
                    data: await this.props.glpi.getAnItem({ 
                        itemtype: itemtype.PluginFlyvemdmAgent, 
                        id: this.props.id 
                    }) 
                })
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.props.history.push(`${publicURL}/app/devices`)
            }
        }
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.props.selectedItems.map((item) => {
                return {
                    id: item[`${itemtype.PluginFlyvemdmAgent}.id`]
                }
            })

            this.setState({
                isLoading: true
            })
            
            this.props.glpi.deleteItem({ itemtype: itemtype.PluginFlyvemdmAgent, input: itemListToDelete })
            .then((response) => {
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.device_successfully_removed'),
                    type: 'success'
                })
                this.props.changeSelectionMode(false)
                this.props.history.goBack()
                this.props.changeAction('reload')
            })
            .catch((error) => {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            })
        }
    }

    handleEdit = () => {
        const path = `${publicURL}/app/devices/${this.props.id}/edit`
        this.props.history.push(path)
    }

    ping = () => {
        this.setState({
            sendingPing: true
        }, async () => {
            try {
                const response = await this.props.glpi.genericRequest({
                    path: `${itemtype.PluginFlyvemdmAgent}/${this.props.id}`,
                    requestParams: {
                        method: 'PUT',
                        body: JSON.stringify({"input":{"_ping": ""}})
                    }
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.ping_sent'),
                    type: 'success'
                })
                this.setState({ sendingPing: false }, () => {
                    this.handleRefresh()
                })
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({ sendingPing: false })
            }
        })
    }
    
    render() {
        let renderComponent 
        if (this.state.data === undefined) {
            renderComponent = <Loading message={`${I18n.t('commons.loading')}...`}/>
        } else {
            let imageAgent = this.state.data["mdm_type"] ? `${this.state.data["mdm_type"]}.png` : null
            let iconComponent 
            
            if (imageAgent) {
                iconComponent = <IconItemList image={imageAgent} size={72} backgroundColor="transparent"/>
            } else {
                iconComponent = <IconItemList size={72} />
            }
            renderComponent = (
            <ContentPane className="devices">
                <div className="content-header">
                    <div className="itemInfo">
                        {iconComponent}
                        <div className="contentStatus">
                            <div className="name">{this.state.data["name"]}</div>

                            <div className="message">
                                {
                                    this.state.data["is_online"] === 1 ? I18n.t('commons.online') : I18n.t('commons.offline')
                                }
                            </div>
                            <div className="source">
                                {this.state.data["last_contact"]} 
                                &nbsp; {I18n.t('devices.main.last_contact')}
                            </div>   
                            <div style={{overflow: 'auto'}}>
                                <div>
                                    <button className="btn --secondary" style={{float:'left', marginTop: 5, marginBottom: 5}} onClick={this.ping}>
                                        {I18n.t('commons.ping')}
                                    </button>
                                    { this.state.sendingPing ? <Loading small/> : '' }
                                </div>
                            </div>
                            <div>
                                <span
                                    className="editIcon"
                                    style={{ marginRight: '20px', fontSize: '20px' }}
                                        onClick={this.handleEdit}
                                />
                                <span
                                    className="deleteIcon"
                                        style={{ marginRight: '20px', fontSize: '20px' }}
                                    onClick={this.handleDelete}
                                />
                            </div>
                        </div>         
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo">
                    <div className="title">
                        {I18n.t('commons.version')}
                    </div>
                    <div style={{ paddingLeft: 20 }}>{this.state.data["version"]}</div>
                    <div className="title">
                        {I18n.t('commons.type')}
                    </div>
                    <div style={{ paddingLeft: 20 }}>{this.state.data["mdm_type"]}</div>
                </div>
                
                <Confirmation 
                    title={I18n.t('devices.delete')}
                    message={this.state.data["name"]} 
                    reference={el => this.contentDialog = el} 
                /> 
            </ContentPane>
            )
        }
        return renderComponent
    }
}
Main.propTypes = {
    id: PropTypes.string.isRequired,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired,
    update: PropTypes.bool.isRequired
}