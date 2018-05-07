import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import IconItemList from '../../../components/IconItemList'
import BytesToSize from '../../../shared/bytesToSize'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import publicURL from '../../../shared/publicURL'

export default class ApplicationsContent extends PureComponent {

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
            this.props.history.push(`${publicURL}/app/applications`)
        }
    }

    render() {
        if (this.state.isLoading || this.state.data === undefined) {
            return (<Loading message={`${I18n.t('commons.loading')}...`} />)
        } else {
            let image
            if (this.state.data["icon"]) {
                image = (
                    <IconItemList 
                        size={this.props.size} 
                        image={"data:image/png;base64, " + this.state.data["icon"]} 
                        type="base64"
                        backgroundColor="transparent"
                    />
                )
            } else {
                image = (
                    <div 
                        style={{ 
                            display: 'inline-block',
                            width: 72, 
                            height: 72,
                            fontSize: '40px',
                            textAlign: 'center'
                        }}
                    >
                        <span className="documentIcon"/>
                    </div>
                )
            }
            return (
                <ContentPane>
                    <div className="content-header" style={{ margin: '0 10px' }}>
                        <h2 style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}> 
                            {I18n.t('applications.title')} 
                        </h2>
                        <div className="item-info">
                            {image}
                            <div>
                                <div className="item-info__name">{this.state.data["alias"]}</div>
                                <div className="item-info__detail">{this.state.data["name"]}</div>
                                <div className="item-info__detail">{BytesToSize(this.state.data["filesize"])}</div>
                                <span className="item-info__source">{this.state.data["source"]}</span>
                                <br />
                                <div>
                                    <span
                                        className="editIcon"
                                        style={{ marginRight: '20px', fontSize: '20px' }}
                                        onClick={() => this.props.history.push(`${publicURL}/app/applications/${this.state.id}/edit`)}
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
