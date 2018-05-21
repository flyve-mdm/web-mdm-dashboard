import React, { PureComponent } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import FilesItemList from './FilesItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

export default class FilesList extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            scrolling: false,
            isLoading: false,
            isLoadingMore: false,
            itemList: new WinJS.Binding.List([]),
            order: "ASC",
            totalcount: 0,
            pagination: {
                start: 0,
                page: 1,
                count: 15
            }
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    componentDidUpdate(prevProps) {
        if(this.listView) {
            this.listView.winControl.footer.style.outline = 'none'
            this.listView.winControl.footer.style.height = this.state.totalcount > (this.state.pagination.page * this.state.pagination.count) ? this.state.isLoadingMore ? '100px' : '42px' : '1px'
        }
        if (this.toolBar) {
            this.toolBar.winControl.forceLayout();
        }

        if (this.props.action === 'reload') {
            this.handleRefresh()
            this.props.changeAction(null)
        }

        if (prevProps.selectedItems.length > 0 && this.props.selectedItems.length === 0 && !this.props.selectionMode) {
            if (this.listView) {
                this.listView.winControl.selection.clear()
            }
        }
    }

    componentWillUnmount() {
        this.props.changeSelectionMode(false)
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <FilesItemList itemList={ItemList.data} size={42} />
        )
    })

    handleRefresh = () => {
        this.props.history.push(`${publicURL}/app/files`)
        this.setState({
            isLoading: true,
            scrolling: false,
            totalcount: 0,
            pagination: {
                start: 0,
                page: 1,
                count: 15
            }
        }, async () => {
            try {
                const files = await this.props.glpi.searchItems({ itemtype: itemtype.PluginFlyvemdmFile, options: { uid_cols: true, forcedisplay: [1, 2, 3], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })
                this.setState({
                    order: files.order,
                    itemList: new WinJS.Binding.List(files.data),
                    isLoading: false,
                    totalcount: files.totalcount
                })
            } catch (error) {
                this.setState({
                    isLoading: false,
                    order: "ASC"
                })
            }
        })
    }

    handleEdit = () => {
        const path = `${publicURL}/app/files/edit`
        this.props.history.push(path)
    }

    handleAdd = (eventObject) => {
        this.props.history.push(`${publicURL}/app/files/add`)
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        if (this.listView) {
            this.listView.winControl.selection.clear()
        }
    }

    handleToggleSelectionMode = () => {
        this.props.history.push(`${publicURL}/app/files`)
        this.props.changeSelectionMode(!this.props.selectionMode)
        this.props.changeSelectedItems([])
        if (this.listView) {
            this.listView.winControl.selection.clear()
        }
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        let itemSelected = []

        for (const item of index) {
            itemSelected.push(this.state.itemList.getItem(item).data)
        }
        this.props.changeSelectedItems(itemSelected)
        if (index.length === 1 && !this.props.selectionMode) {
            this.props.history.push(`${publicURL}/app/files/${itemSelected[0]["PluginFlyvemdmFile.id"]}`)
        }
        if (index.length > 1 && !this.props.selectionMode) {
            this.props.history.push(`${publicURL}/app/files/edit/`)
        }
    }

    handleDelete = async (eventObject) => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {
            
            let itemListToDelete = this.props.selectedItems.map((item) => {
                return {
                    id: item["PluginFlyvemdmFile.id"]
                }
            })
            
            this.setState({
                isLoading: true
            }, async () => {
                try {
                    await this.props.glpi.deleteItem({ itemtype: itemtype.PluginFlyvemdmFile, input: itemListToDelete, queryString: { force_purge: true } })

                    this.props.setNotification({
                        title: I18n.t('commons.success'),
                        body: I18n.t('notifications.device_successfully_removed'),
                        type: 'success'
                    })
                    this.props.changeSelectionMode(false)
                    this.props.changeSelectedItems([])
                    this.props.changeAction('reload')
                } catch (error) {
                    this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                    this.props.changeSelectionMode(false)
                    this.props.changeSelectedItems([])
                    this.setState({ isLoading: false })
                }
            })
        } else {
            this.props.changeSelectionMode(false)
            this.props.changeSelectedItems([])
            if (this.listView) {
                this.listView.winControl.selection.clear()
            }
        }
    }

    handleSort = async () => {
        try {
            this.setState({
                isLoading: true,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            let newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

            const files = await this.props.glpi.searchItems({ itemtype: itemtype.PluginFlyvemdmFile, options: { uid_cols: true, order: newOrder, forcedisplay: [1, 2, 3] } })

            this.setState({
                isLoading: false,
                order: files.order,
                totalcount: files.totalcount,
                itemList: new WinJS.Binding.List(files.data)
            })
            this.props.history.push(`${publicURL}/app/files`)

        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    onLoadingStateChanged = (eventObject) => {
        if (eventObject.detail.scrolling === true) {
            setTimeout(() => {
                this.setState({
                    scrolling: true
                })
            }, 0)
        }
    }

    loadMoreData = async () => {
        try {   
            this.setState({
                isLoadingMore: true
            })         
            let range = {
                from: this.state.pagination.count * this.state.pagination.page,
                to: (this.state.pagination.count * (this.state.pagination.page + 1)) - 1
            }
            if (range.from <= this.state.totalcount) {
                for (const key in range) {
                    if (range.hasOwnProperty(key)) {
                        if (range[key] >= this.state.totalcount)
                            range[key] = this.state.totalcount - 1
                    }
                }
                const files = await this.props.glpi.searchItems({ itemtype: itemtype.PluginFlyvemdmFile, options: { uid_cols: true, forcedisplay: [1, 2, 3], order: this.state.order, range: `${range.from}-${range.to}` } })
                
                for (const item in files.data) {
                    this.state.itemList.push(files.data[item])
                }

                this.setState({
                    isLoadingMore: false,
                    totalcount: files.totalcount,
                    pagination: {
                        ...this.state.pagination,
                        page: this.state.pagination.page + 1
                    }
                })
            }

        } catch (error) {
            this.setState({
                isLoadingMore: false
            })
        }
    }

    render() {
        let deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                label={I18n.t('commons.delete')}
                priority={0}
                disabled={this.props.selectedItems.length === 0}
                onClick={this.handleDelete}
            />
        )

        let editCommand = (
            <ReactWinJS.ToolBar.Button
                key="edit"
                icon="edit"
                label={I18n.t('commons.edit')}
                priority={0}
                disabled={this.props.selectedItems.length === 0}
                onClick={this.handleEdit}
            />
        )

        let footerComponent = this.state.isLoadingMore ? 
            <Loader /> : 
            (
                <div onClick={this.loadMoreData} style={{ cursor: 'pointer', color:'#158784'}}>
                    <span
                        className="refreshIcon"
                        style={{ padding: '10px', fontSize: '20px' }}
                        onClick={this.loadMoreData}/>
                    <span>{I18n.t('commons.load_more')}</span>
                </div>
            )

        let listComponent

        if (this.state.isLoading) {
            listComponent = <Loader count={3} />
        } else {
            if (this.state.itemList.length > 0) {
                    listComponent = (
                    <ReactWinJS.ListView
                        ref={(listView) => { this.listView = listView }}
                        onLoadingStateChanged={this.onLoadingStateChanged}
                        className="list-pane__content win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={this.state.itemList.dataSource}
                        layout={this.state.layout}
                        itemTemplate={this.ItemListRenderer}
                        footerComponent={footerComponent}
                        selectionMode={this.props.selectionMode ? 'multi' : 'single'}
                        tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
                        onSelectionChanged={this.handleSelectionChanged}
                    />
                )
            } else {
                listComponent = <EmptyMessage message={I18n.t('files.not_found')} icon={this.props.icon} showIcon={true} />
            }
        }

        return (
            <React.Fragment>
                <ReactWinJS.ToolBar ref={(toolBar) => { this.toolBar = toolBar }} className="listToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="sort"
                        icon="sort"
                        label={I18n.t('commons.sort')}
                        priority={1}
                        onClick={this.handleSort}
                    />
                    <ReactWinJS.ToolBar.Button
                        key="refresh"
                        icon="refresh"
                        label={I18n.t('commons.refresh')}
                        priority={1}
                        onClick={this.handleRefresh}
                    />

                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label={I18n.t('commons.add')}
                        priority={0}
                        onClick={this.handleAdd}
                    />

                    {this.props.selectionMode ? editCommand : null}
                    {this.props.selectionMode ? deleteCommand : null}

                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label={I18n.t('commons.select')}
                        priority={0}
                        selected={this.props.selectionMode}
                        onClick={this.handleToggleSelectionMode}
                    />
                </ReactWinJS.ToolBar>
                { listComponent }
                <Confirmation 
                    title={I18n.t('files.delete')} 
                    message={`${this.props.selectedItems.length} ${I18n.t('files.delete_message')}` } 
                    reference={el => this.contentDialog = el} 
                />
            </React.Fragment>
        )
    }
}
FilesList.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    changeSelectedItems: PropTypes.func.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
