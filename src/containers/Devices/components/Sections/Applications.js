import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import EmptyMessage from '../../../../components/EmptyMessage'
import ContentPane from '../../../../components/ContentPane'
import Loader from '../../../../components/Loader'

export default class Applications extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            isLoading: false,
            itemList: new WinJS.Binding.List([])
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id) {
            this.setState({
                isLoading: false
            }, () => this.handleRefresh())
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        this.setState({
            isLoading: true
        }, async () => {
            try {
                const {computers_id} = await this.props.glpi.getAnItem({ itemtype: 'PluginFlyvemdmAgent', id: this.props.id })
                const computer = await this.props.glpi.getAnItem({ itemtype: 'Computer', id: computers_id, queryString: { with_softwares: true } })
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
                this.setState({
                    isLoading: false,
                    itemList: new WinJS.Binding.List([])
                })
            }
        })
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

        let listComponent = (<div style={{padding:'20px'}}><Loader type="content"/></div>)

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
                <ContentPane>
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
                <EmptyMessage message="No Applications Available" />
            )
        }

        return listComponent
    }
}
Applications.propTypes = {
    id: PropTypes.string.isRequired,
    glpi: PropTypes.object.isRequired
}
