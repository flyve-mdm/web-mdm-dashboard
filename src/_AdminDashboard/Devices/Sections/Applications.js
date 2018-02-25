import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import packages from '../../data/packages.json'
import IconItemList from '../../IconItemList'
import BytesToSize from '../../../Utils/BytesToSize'

class Applications extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List(packages.data)
        }
    }

    itemRenderer = ReactWinJS.reactRenderer((item) => {
        
        return (
            <div className="list-content">
                <div className="list-col">
                    <IconItemList 
                        size={60} 
                        image={"data:image/png;base64, " + item.data["PluginFlyvemdmPackage.icon"]} 
                        type="base64"
                        backgroundColor="transparent"
                    />
                </div>
                <div className="list-col">
                    <div className="aplication">
                        ID: &nbsp;              
                        <div className="aplication-detail">
                            {item.data['PluginFlyvemdmPackage.id']}
                        </div> 
                    </div>
                    <div className="aplication">
                        Name: &nbsp;
                        <div className="aplication-detail">
                            {item.data['PluginFlyvemdmPackage.name']}
                        </div> 
                    </div>
                    <div className="aplication">
                        Alias: &nbsp;
                        <div className="aplication-detail">
                            {item.data['PluginFlyvemdmPackage.alias']}
                        </div> 
                    </div>
                    <div className="aplication">
                        Version: &nbsp;
                        <div className="aplication-detail">
                            {item.data['PluginFlyvemdmPackage.version']}
                        </div> 
                    </div>
                    <div className="aplication">
                        Filesize: &nbsp;
                        <div className="aplication-detail">
                            {BytesToSize(item.data['PluginFlyvemdmPackage.filesize'])}
                        </div> 
                    </div>
                </div>
            </div>
        )
    })

    render() {
        return ( 
            <div className="applications">
                <ReactWinJS.ListView
                    ref="listView"
                    className="contentListView win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.state.list.dataSource}
                    itemTemplate={this.itemRenderer}
                    layout={{ type: WinJS.UI.ListLayout }}
                    selectionMode="single"
                    tapBehavior="directSelect"
                    onSelectionChanged={this.props.handleSelectionChanged}
                />
            </div>
        )
    }
}

Applications.propTypes = {
    selectedItemList: PropTypes.array.isRequired
}

export default Applications