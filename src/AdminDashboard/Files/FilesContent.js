import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import Confirmation from '../../Utils/Confirmation'
import Loading from '../../Utils/Loading'

export default class FilesContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    handleDelete = async () => {
        try {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.props.selectedItemList.map((item) => {
                    return {
                        id: item["PluginFlyvemdmFile.id"]
                    }
                })

                this.setState({
                    isLoading: true
                })

                await this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmFile', input: itemListToDelete, queryString: { force_purge: true } })

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
        if (this.state.isLoading) {
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <Loading message="Loading..." />
                </ContentPane>
            )
        } else {
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} updateAnimation={true} >
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                        <div className="itemInfo">
                            <span className="fileIcon" style={{ fontSize: '48px', paddingLeft: '20px', paddingTop: '20px' }} />
                            <div className="contentStatus">
                                <div className="name">{this.props.selectedItemList[0]["PluginFlyvemdmFile.name"]}</div>
                                <br />
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.changeAction("Edit")} />
                                <span className="deleteIcon" onClick={this.handleDelete} />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList[0]["PluginFlyvemdmFile.name"]} reference={el => this.contentDialog = el} />
                </ContentPane>
            )
        }
    }
}
FilesContent.propTypes = {
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
