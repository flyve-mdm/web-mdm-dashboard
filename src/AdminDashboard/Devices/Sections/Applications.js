import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import IconItemList from '../../IconItemList'
import BytesToSize from '../../../Utils/BytesToSize'
import EmptyMessage from '../../../Utils/EmptyMessage'
import ContentPane from '../../../Utils/ContentPane'
import Loader from '../../../Utils/Loader'

class Applications extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            isLoading: false,
            itemList: new WinJS.Binding.List([])
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        try {
            this.setState({
                isLoading: true
            })

            const idComputer = this.props.selectedItemList[0]["PluginFlyvemdmAgent.Computer.id"] !== null ? this.props.selectedItemList[0]["PluginFlyvemdmAgent.Computer.id"] : ""
            const computer = await this.props.glpi.getAnItem({ itemtype: 'Computer', id: idComputer, queryString: { with_softwares: true } })
            let softwareList = []
            for (const item of computer['_softwares']) {
                const software = await this.props.glpi.getAnItem({ itemtype: 'Software', id: item['softwares_id']})
                const softwareVersion = await this.props.glpi.getAnItem({ itemtype: 'SoftwareVersion', id: item['softwareversions_id']})

                let data = {
                    id: software['id'],
                    name: software['name'],
                    alias: software['name'],
                    version: softwareVersion['name'],
                    filesize: 0
                }
                softwareList.push(data)
            }

            this.setState({
                isLoading: false,
                itemList: new WinJS.Binding.List(softwareList)
            })

        } catch (error) {
            console.log(error)
            this.setState({
                isLoading: false,
                itemList: new WinJS.Binding.List([])
            })
        }
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <div className="list-content">
                <div className="list-col">
                    <IconItemList
                        size={60}
                        image={"data:image/png;base64, " + ItemList.data["PluginFlyvemdmPackage.icon"]}
                        type="base64"
                        backgroundColor="transparent"
                    />
                </div>
                <div className="list-col">
                    <div className="aplication">
                        ID: &nbsp;
                        <div className="aplication-detail">
                            {ItemList.data['id']}
                        </div>
                    </div>
                    <div className="aplication">
                        Name: &nbsp;
                        <div className="aplication-detail">
                            {ItemList.data['name']}
                        </div>
                    </div>
                    <div className="aplication">
                        Alias: &nbsp;
                        <div className="aplication-detail">
                            {ItemList.data['alias']}
                        </div>
                    </div>
                    <div className="aplication">
                        Version: &nbsp;
                        <div className="aplication-detail">
                            {ItemList.data['version']}
                        </div>
                    </div>
                    <div className="aplication">
                        Filesize: &nbsp;
                        <div className="aplication-detail">
                            {BytesToSize(ItemList.data['filesize'])}
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    render() {

        let listComponent = (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <div className="listPane" style={{ padding: 0 }}>
                    <Loader count={1} />
                </div>
            </ContentPane>
        )

        if (!this.state.isLoading && this.state.itemList.length > 0) {
            listComponent = (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <div className="listPane" style={{ padding: 0 }}>
                        <ReactWinJS.ListView
                            ref={(listView) => { this.listView = listView }}
                            className="contentListView win-selectionstylefilled"
                            style={{ height: 'calc(100% - 48px)' }}
                            itemDataSource={this.state.itemList.dataSource}
                            itemTemplate={this.ItemListRenderer}
                            layout={this.state.layout}
                            selectionMode={'single'}
                        />
                    </div>
                </ContentPane>

            )
        } else if (!this.state.isLoading && this.state.itemList.length === 0) {
            listComponent = (
                <EmptyMessage message="No Applications Available" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }

        return listComponent
    }
}

Applications.propTypes = {
    selectedItemList: PropTypes.array.isRequired,
    glpi: PropTypes.object.isRequired
}

export default Applications