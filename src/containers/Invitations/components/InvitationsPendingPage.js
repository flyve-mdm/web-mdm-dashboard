import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import Pluralize from 'pluralize'
import WinJS from 'winjs'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loader from '../../../components/Loader'

export default class InvitationsPendingPage extends Component {

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

            const idInvitation = this.props.selectedItemList[0]["PluginFlyvemdmInvitation.id"] !== null ? this.props.selectedItemList[0]["PluginFlyvemdmInvitation.id"] : ""
            const logs = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmInvitationlog', options: { uid_cols: true, forcedisplay: [2, 3, 4, 5] }, criteria: [{ field: '4', searchtype: 'equal', value: idInvitation }] })

            this.setState({
                isLoading: false,
                itemList: new WinJS.Binding.List(logs.data)
            })
            
        } catch (error) {
            this.setState({
                isLoading: false,
                itemList: new WinJS.Binding.List([])
            })
        }
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                <b>{ItemList.data['PluginFlyvemdmInvitationlog.event']}</b>
                <br />
                {ItemList.data['PluginFlyvemdmInvitationlog.date_creation']}
            </div>
        )
    })

    render() {

        let listComponent = (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <div className="listPane" style={{ padding: 0 }}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" >Pending {Pluralize.singular(this.props.location[0])} </h2>
                    </div>
                    <Loader count={1} />
                </div>
            </ContentPane>
        )

        if (!this.state.isLoading && this.state.itemList.length > 0) {
            listComponent = (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <div className="listPane" style={{ padding: 0 }}>
                        <div className="contentHeader">
                            <h2 className="win-h2 titleContentPane" >Pending {Pluralize.singular(this.props.location[0])} </h2>
                        </div>
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
                <EmptyMessage message="No Logs Available" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }

        return listComponent
    }
}
InvitationsPendingPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    selectedItemList: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}
