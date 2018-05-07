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
            layout: { type: WinJS.UI.ListLayout },
            isLoading: false,
            itemList: new WinJS.Binding.List([])
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id || this.props.update !== newProps.update) {
            this.setState({
                isLoading: false
            }, () => this.handleRefresh())
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        if (this.props.update) {
            this.setState({
                isLoading: true
            }, async () => {
                try {
                    const {computers_id} = await this.props.glpi.getAnItem({ itemtype: itemtype.PluginFlyvemdmAgent, id: this.props.id })
                    const computer = await this.props.glpi.getAnItem({ itemtype: itemtype.Computer, id: computers_id, queryString: { with_softwares: true } })
                    let softwareList = []
                    for (let index = 0; index < computer['_softwares'].length; index++) {
                        try {
                            const software = await this.props.glpi.getAnItem({ itemtype: itemtype.Software, id: computer['_softwares'][index]['softwares_id']})
                            softwareList.push({
                                id: software['id'],
                                name: software['name'],
                                date_mod: software['date_mod']
                            })
                        } catch (e) {}
                    }
        
                    this.setState({
                        isLoading: false,
                        itemList: new WinJS.Binding.List(softwareList)
                    })
        
                } catch (error) {
                    this.setState({
                        isLoading: false,
                        itemList: new WinJS.Binding.List([])
                    })
                }
            })
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
                <div style={styles}>{ItemList.data['id']}</div>
                <div style={styles}>{ItemList.data['name']}</div>
                <div style={styles}>{ItemList.data['date_mod']}</div>
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
