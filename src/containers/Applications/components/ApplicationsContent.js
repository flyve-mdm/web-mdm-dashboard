import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import IconItemList from '../../../components/IconItemList'
import BytesToSize from '../../../shared/bytesToSize'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import location from '../../../shared/location'

export default class ApplicationsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: getID(this.props.history.location.pathname),
            data: undefined
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== getID(this.props.history.location.pathname)) {
            this.setState({
                data: undefined,
                id: getID(this.props.history.location.pathname)
            }, () => this.handleRefresh())
        }
    }
    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.props.selectedItems.map((item) => {
                return {
                    id: item["PluginFlyvemdmPackage.id"]
                }
            })

            this.setState({
                isLoading: true
            })
            try {
                await this.props.glpi.deleteItem({ itemtype: itemtype.PluginFlyvemdmPackage, input: itemListToDelete, queryString: { force_purge: true } })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.elements_successfully_removed'),
                    type: 'success'
                })
                this.props.changeAction('reload')
                this.props.changeSelectionMode(false)
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({
                    isLoading: false
                })
            }
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        try {
            this.setState({ 
                data: await this.props.glpi.getAnItem({ 
                    itemtype: itemtype.PluginFlyvemdmPackage, 
                    id: this.state.id 
                }) 
            })
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.props.history.push(`${location.pathname}/app/applications`)
        }
    }

    render() {
        if (this.state.isLoading || this.state.data === undefined) {
            return (<Loading message={`${I18n.t('commons.loading')}...`} />)
        } else {
            let image = "data:image/png;base64, " + this.state.data["icon"]
            return (
                <ContentPane>
                    <div className="contentHeader">
                        <h2 className="win-h2" style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}> 
                            {I18n.t('applications.title')} 
                        </h2>
                        <div className="itemInfo">
                            <IconItemList
                                size={72}
                                image={image}
                                type="base64"
                                backgroundColor="transparent"
                            />
                            <div className="contentStatus">
                                <div className="name">{this.state.data["alias"]}</div>
                                <div className="detail">{this.state.data["name"]}</div>
                                <div className="detail">{BytesToSize(this.state.data["filesize"])}</div>
                                <span className="source">{this.state.data["source"]}</span>
                                <br />
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.history.push(`${location.pathname}/app/applications/${this.state.id}/edit`)} />
                                <span className="deleteIcon" onClick={this.handleDelete} />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <Confirmation title={I18n.t('applications.delete')} message={this.state.data["name"]} reference={el => this.contentDialog = el} />
                </ContentPane>
            )
        }
    }
}
ApplicationsContent.propTypes = {
    selectedItems: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
ApplicationsContent.defaultProps = {
    selectedItems: []
}
