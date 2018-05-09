import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loader from '../../../components/Loader'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID/index'

class InvitationsPendingPage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            isLoading: true,
            itemList: new WinJS.Binding.List([]),
            id: getID(this.props.history.location.pathname)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== getID(nextProps.history.location.pathname)) {
            return {
                ...prevState,
                id: getID(nextProps.history.location.pathname),
                itemList: new WinJS.Binding.List([]),
                isLoading: true
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.id !== this.state.id) {
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        try {
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
                <div className="list-pane" style={{ margin: '0 10px' }}>
                    <div className="content-header">
                        <h2 className="content-header__title" >
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
                    <div className="list-pane" style={{ margin: '0 10px' }}>
                        <div className="content-header">
                            <h2 className="content-header__title">
                                {I18n.t('invitations.pending')}
                            </h2>
                        </div>
                        <ReactWinJS.ListView
                            ref={(listView) => { this.listView = listView }}
                            className="list-pane__content win-selectionstylefilled"
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