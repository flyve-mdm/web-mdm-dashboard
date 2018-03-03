import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loader from '../../../components/Loader'

class Applications extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            isLoading: false,
            itemList: new WinJS.Binding.List([])
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                itemList: new WinJS.Binding.List([])
            })
            this.handleRefresh()
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

        const styles = {
            boxSizing: 'border-box',
            padding: '15px',
            width: '25%',
            float: 'left'
        }

        return (
            <React.Fragment>
                <div style={styles}>{ItemList.data['id']}</div>
                <div style={styles}>{ItemList.data['name']}</div>
                <div style={styles}>{ItemList.data['version']}</div>
                <div style={styles}>N/A</div>
            </React.Fragment>
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

        const stylesHeader = {
            boxSizing: 'border-box',
            padding: '15px',
            width: '25%',
            float: 'left'
        }

        const headerComponent = (
            <React.Fragment>
                <div style={stylesHeader}>#</div>
                <div style={stylesHeader}>Application ID</div>
                <div style={stylesHeader}>Name version</div>
                <div style={stylesHeader}>Category</div>
            </React.Fragment>
        )

        if (!this.state.isLoading && this.state.itemList.length > 0) {
            listComponent = (
                <ContentPane >
                    <div className="listPane" style={{ padding: 0 }}>
                        <ReactWinJS.ListView
                            ref={(listView) => { this.listView = listView }}
                            className="contentListView win-selectionstylefilled"
                            headerComponent={headerComponent}
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