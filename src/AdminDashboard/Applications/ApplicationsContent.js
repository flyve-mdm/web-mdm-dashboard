import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import IconItemList from '../IconItemList'
import BytesToSize from '../../Utils/BytesToSize'
import Confirmation from '../../Utils/Confirmation'
import Loading from '../../Utils/Loading'

export default class ApplicationsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            data: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                data: undefined
            })
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {

        try {
            const applications = await this.props.glpi.getAnItem({ itemtype: 'PluginFlyvemdmPackage', id: this.props.selectedItemList[0]['PluginFlyvemdmPackage.id'] })
            this.setState({
                data: applications
            })
            
        } catch (error) {
            
        }
    }

    handleDelete = async () => {
        try {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.props.selectedItemList.map((item) => {
                    return {
                        id: item["PluginFlyvemdmPackage.id"]
                    }
                })

                this.setState({
                    isLoading: true
                })

                await this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmPackage', input: itemListToDelete, queryString: { force_purge: true } })

                this.props.showNotification('Success', 'elements successfully removed')
                this.props.changeSelectionMode(false)
                this.props.onNavigate([this.props.location[0]])
                this.props.changeAction("Reload")

            } else {
                this.setState({
                    isLoading: false
                })
            }

        } catch (error) {
            if (error.length > 1) {
                this.props.showNotification(error[0], error[1])
            } else {
                this.props.showNotification('Error', error)
            }
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        if (this.state.isLoading || this.state.data === undefined) {
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <Loading message="Loading..." />
                </ContentPane>
            )
        } else {
            let image = "data:image/png;base64, " + this.state.data["icon"]
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} updateAnimation={true}>
                    <div className="contentHeader">
                        <h2 className="win-h2" style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}> {Pluralize.singular(this.props.location[0])} </h2>
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
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.changeActionList('Edit')} />
                                <span className="deleteIcon" onClick={this.handleDelete} />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.data["name"]} reference={el => this.contentDialog = el} />
                </ContentPane>
            )
        }
    }
}
ApplicationsContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedItemList: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
ApplicationsContent.defaultProps = {
    selectedItemList: []
}
