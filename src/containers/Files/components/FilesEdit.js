import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FilesEditItemList from './FilesEditItemList'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'

export default class FilesEdit extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            selectedItem:[],
            isLoading: false
        }
    } 

    updateItemList = (index, name) => {
        let newItem = [...this.state.selectedItem]

        //Find index of specific object using findIndex method.    
        let objIndex = newItem.findIndex((obj => obj["id"] === index));

        // Update object's name property.
        if(objIndex !== -1) {
            newItem[objIndex]["name"] = name
        } else {
            const item = {"id": index, "name": name}
            newItem.push(item)
        }

        this.setState({
            selectedItem: newItem
        })
    }

    handleSaveFiles = async () => {
        
        try {
            if (this.state.selectedItem.length > 0) {

                this.setState({
                    isLoading: true
                })
                await this.props.glpi.updateItem({ itemtype: itemtype.PluginFlyvemdmFile, input: this.state.selectedItem})

                if (this.state.selectedItem.length > 1) {
                    this.props.setNotification({
                        title: I18n.t('commons.success'),
                        body: I18n.t('notifications.edited_files'),
                        type: 'success'
                    })
                } else {
                    this.props.setNotification({
                        title: I18n.t('commons.success'),
                        body: I18n.t('notifications.edited_file'),
                        type: 'success'
                    })
                }

                this.props.changeSelectionMode(false)
                this.props.changeAction('reload')
            }
            
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({
                isLoading: false
            })
        }
    }

    render() {

        if (this.props.selectedItems) {

            if (this.state.isLoading) {
                return (<Loading message={`${I18n.t('commons.loading')}...`} />)
            } else {
                let renderComponent = this.props.selectedItems.map((item, index) => {

                    return (
                        <FilesEditItemList
                            key={index}
                            updateItemList={this.updateItemList}
                            selectedItem={item}
                        />
                    )
                })

                return (
                    <ContentPane>
                        <div className="content-header" style={{ margin: '0 10px' }}>
                            <div style={{overflow: 'auto'}}>
                                <button className="btn btn--primary" style={{marginTop: 0}} onClick={this.handleSaveFiles}>
                                    {I18n.t('commons.save')}
                                </button>
                            </div>
                        </div>
                        <div className="separator" />
                        {renderComponent}
                    </ContentPane>
                )
            }

        } else {
            return null
        }
    }
}
FilesEdit.propTypes = {
    selectedItems: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}