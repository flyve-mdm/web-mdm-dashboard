import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import EmptyMessage from '../../../../components/EmptyMessage'
import ContentPane from '../../../../components/ContentPane'
import Loader from '../../../../components/Loader'
import { I18n } from 'react-i18nify'
import itemtype from '../../../../shared/itemtype'

export default class Applications extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            update: this.props.update,
            layout: { type: WinJS.UI.ListLayout },
            isLoading: true,
            itemList: new WinJS.Binding.List([])
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
            return {
                ...prevState,
                id: nextProps.id,
                update: nextProps.update,
                isLoading: true
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        if (this.state.update) {
            try {
                const { computers_id } = await this.props.glpi.getAnItem({ itemtype: itemtype.PluginFlyvemdmAgent, id: this.state.id })
                const { totalcount } = await this.props.glpi.searchItems({
                    itemtype: itemtype.Software,
                    options: { uid_cols: true, forcedisplay: [2]},
                    range: '0-0',
                    metacriteria: [{ link: 'AND', itemtype: itemtype.Computer, field: 2, searchtype: 'equals', value: computers_id }]
                })
                const softwareList = await this.props.glpi.searchItems({
                    itemtype: itemtype.Software,
                    options: { uid_cols: true, forcedisplay: [1, 2, 19]},
                    range: `0-${totalcount}`,
                    metacriteria: [{ link: 'AND', itemtype: itemtype.Computer, field: 2, searchtype: 'equals', value: computers_id }]
                })

                this.setState({
                    isLoading: false,
                    itemList: new WinJS.Binding.List(softwareList.data)
                })

            } catch (error) {
                this.setState({
                    isLoading: false,
                    itemList: new WinJS.Binding.List([])
                })
            }
        }
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {

        const styles = {
            boxSizing: 'border-box',
            padding: '15px',
            width: '33%',
            float: 'left',
            overflow: 'auto'
        }

        return (
            <React.Fragment>
                <div style={styles}>{ItemList.data['Software.id']}</div>
                <div style={styles}>{ItemList.data['Software.name']}</div>
                <div style={styles}>{ItemList.data['Software.date_mod']}</div>
            </React.Fragment>
        )
    })

    render() {

        let listComponent = (<div style={{padding:'20px'}}><Loader type="content"/></div>)

        const stylesHeader = {
            boxSizing: 'border-box',
            padding: '15px',
            width: '33%',
            float: 'left',
            overflow: 'auto'
        }

        const headerComponent = (
            <React.Fragment>
                <div style={stylesHeader}>#</div>
                <div style={stylesHeader}>{I18n.t('devices.applications.id')}</div>
                <div style={stylesHeader}>{I18n.t('devices.applications.last_modification')}</div>
            </React.Fragment>
        )

        if (!this.state.isLoading && this.state.itemList.length > 0) {
            listComponent = (
                <ContentPane className="applications">
                    <div className="list-pane" style={{ padding: 0 }}>
                        <ReactWinJS.ListView
                            ref={(listView) => { this.listView = listView }}
                            className="list-pane__content win-selectionstylefilled"
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
                <EmptyMessage message={I18n.t('devices.applications.empty_message')} />
            )
        }

        return listComponent
    }
}
Applications.propTypes = {
    id: PropTypes.string.isRequired,
    glpi: PropTypes.object.isRequired,
    update: PropTypes.bool.isRequired
}
