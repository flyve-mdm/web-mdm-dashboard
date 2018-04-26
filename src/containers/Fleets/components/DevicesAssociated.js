import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import withGLPI from '../../../hoc/withGLPI'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import EmptyMessage from '../../../components/EmptyMessage'
import WinJS from 'winjs'
import ReactWinJS from 'react-winjs'

class DevicesAssociated extends Component {

    constructor(props) {
        super(props)
        this.state = {
            devices: undefined,
            isLoading: true,
            name: undefined,
            layout: { type: WinJS.UI.ListLayout },
            itemList: new WinJS.Binding.List([])
        }
    }

    componentDidMount = async () => {
        try {
            const { name } = await this.props.glpi.getAnItem({itemtype: itemtype.PluginFlyvemdmFleet, id: getID(this.props.history.location.pathname)})
            
            const devices = await this.props.glpi.searchItems({
                itemtype: itemtype.PluginFlyvemdmAgent,
                options: {
                    uid_cols: true, 
                    forcedisplay: [2, 3]
                },
                criteria: 
                [
                    {
                        link: 'and',
                        field: 3,
                        searchtype: 'contains',
                        value: name
                    }
                ]
            })
            this.setState({ 
                name,
                devices,
                isLoading: false,
                itemList: new WinJS.Binding.List(devices.data)
            })
        } catch (error) {
            this.setState({
                isLoading: false
            })
        }
    }

    headerComponent = (
        <React.Fragment>
            <span className="id">#</span>
            <span className="name">{I18n.t('commons.name')}</span>
        </React.Fragment>
    )

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <React.Fragment>
                <span className="id">{ItemList.data[`${itemtype.PluginFlyvemdmAgent}.id`]}</span>
                <span className="name">{ItemList.data[`${itemtype.PluginFlyvemdmAgent}.name`]}</span>
            </React.Fragment>
        )
    })

    render () {
        return (
            <ContentPane className="fleets">
                {
                    this.state.isLoading ? 
                        <Loading message={`${I18n.t('commons.loading')}...`} /> :
                        (
                            (!this.state.devices || this.state.devices.totalcount === 0) ? 
                                <EmptyMessage message={I18n.t('fleets.no_associated_devices')}/> :
                                (
                                    <React.Fragment>
                                        <h2>{I18n.t('fleets.devices_of')} '{this.state.name}'</h2>
                                        <div className="listPane">
                                            <ReactWinJS.ListView
                                                ref={(listView) => { this.listView = listView }}
                                                className="contentListView win-selectionstylefilled"
                                                itemDataSource={this.state.itemList.dataSource}
                                                itemTemplate={this.ItemListRenderer}
                                                headerComponent={this.headerComponent}
                                                layout={this.state.layout}
                                                selectionMode={'single'}
                                            />
                                        </div>
                                    </React.Fragment>
                                )
                        )
                }
            </ContentPane>
        )
    }
}

DevicesAssociated.propTypes = {
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default withGLPI(DevicesAssociated)