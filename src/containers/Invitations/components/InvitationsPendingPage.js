import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loader from '../../../components/Loader'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'

class InvitationsPendingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            isLoading: false,
            itemList: new WinJS.Binding.List([]),
            id: this.props.history.location.pathname.split("/")[3]
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== newProps.history.location.pathname.split("/")[3]) {
            this.setState({
                id: newProps.history.location.pathname.split("/")[3]
            }, () => this.handleRefresh())
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

            const logs = await this.props.glpi.searchItems({ 
                itemtype: itemtype.PluginFlyvemdmInvitationlog, 
                options: { uid_cols: true, forcedisplay: [2, 3, 4, 5] }, 
                criteria: [{ field: '4', searchtype: 'equal', value: this.state.id }] 
            })

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
            <ContentPane>
                <div className="listPane" style={{ padding: 0 }}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" >
                            {I18n.t('invitations.pending')}
                        </h2>
                    </div>
                    <Loader count={1} />
                </div>
            </ContentPane>
        )

        if (!this.state.isLoading && this.state.itemList.length > 0) {
            listComponent = (
                <ContentPane>
                    <div className="listPane" style={{ padding: 0 }}>
                        <div className="contentHeader">
                            <h2 className="win-h2 titleContentPane">
                                {I18n.t('invitations.pending')}
                            </h2>
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
                <EmptyMessage message={I18n.t('invitations.no_logs')}/>
            )
        }

        return listComponent
    }
}

InvitationsPendingPage.propTypes = {
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default InvitationsPendingPage