import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../Utils/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'

class DevicesContent extends Component {

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} updateAnimation={true} >
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header="Main">

                        <Main 
                            dataSource={this.props.dataSource} 
                            selectedIndex={this.props.selectedIndex} 
                            changeActionList={this.props.changeActionList} 
                            location={this.props.location} 
                            selectedItemList={this.props.selectedItemList} 
                            onNavigate={this.props.onNavigate} 
                            changeDataSource={this.props.changeDataSource}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="systemReport" header="System Report">

                        <SystemReport 
                            selectedItemList={this.props.selectedItemList}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="applications" header="Applications">
                        
                        <Applications 
                            selectedItemList={this.props.selectedItemList}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header="Geolocation">
                        <Geolocation 
                            itemListPaneWidth={this.props.itemListPaneWidth}
                        />
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header="Danger Zone">

                        <DangerZone 
                            selectedItemList={this.props.selectedItemList}
                        />

                    </ReactWinJS.Pivot.Item>
                </ReactWinJS.Pivot>
            </ContentPane>
        )
    }
}

DevicesContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedItemList: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired
}

export default DevicesContent