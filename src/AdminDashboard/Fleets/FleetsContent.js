import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import Confirmation from '../../Utils/Confirmation'

export default class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
        }
    }

    render() {
        let renderComponent
        if (this.props.policiesData) {
            renderComponent = this.props.policiesData.map((item, index) => {
                return (
                    <FleetsTaskItemList
                        key={[item['PluginFlyvemdmPolicy.name'], index].join("_")}
                        data={item} 
                        addedPolicy={false} />
                )
            })
        }

        return ( 
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        <div className="contentStatus">
                            <div className="name">{this.props.selectedItemList[0]["PluginFlyvemdmFleet.name"]}</div>
                            <br />
                            <span className="editIcon" style={{ marginRight: '20px' }} onClick={this.handleEdit} />
                            <span className="deleteIcon" onClick={this.handleDelete} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo" style={{ width: '100%', marginTop: '20px', marginBottom: '20px', display: 'inline-block' }} >
                    <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks </h3>
                </div>

                { renderComponent }

                <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList[0]["PluginFlyvemdmFleet.name"]} reference={el => this.contentDialog = el} />
            </ContentPane>
        )
    }
}
FleetsContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    policiesData: PropTypes.array.isRequired,
    tasksData: PropTypes.array.isRequired
}