import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApplicationsEditItemList from './ApplicationsEditItemList'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import itemtype from '../../../shared/itemtype'
import { I18n } from "react-i18nify"

export default class ApplicationsEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItems],
            isLoading: false
        }
    }

    updateItemList = (index, name) => {
        let newItem = [...this.state.itemListEdit]

        //Find index of specific object using findIndex method.    
        let objIndex = newItem.findIndex((obj => obj["id"] === index));

        // Update object's name property.
        if (objIndex !== -1) {
            newItem[objIndex]["alias"] = name
        } else {
            const item = { "id": index, "alias": name }
            newItem.push(item)
        }

        this.setState({
            itemListEdit: [...newItem]
        })
    }

    handleSaveFiles = async () => {

        try {
            if (this.state.itemListEdit.length > 0) {

                this.setState({
                    isLoading: true
                })
                await this.props.glpi.updateItem({ itemtype: itemtype.PluginFlyvemdmPackage, input: this.state.itemListEdit })

                if (this.state.itemListEdit.length > 1) {
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
            this.props.setNotification(this.props.handleError({ type: 'alert', error: error }))
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
                        <ApplicationsEditItemList
                            key={index}
                            history={this.props.history}
                            updateItemList={this.updateItemList}
                            selectedItem={item}
                            changeAction={this.props.changeAction}
                        />
                    )
                })

                return (
                    <ContentPane>
                        <div className="contentHeader">
                            <h2 className="win-h2 titleContentPane"> 
                                {I18n.t('applications.edit')} 
                            </h2>
                            <button className="btn --primary" onClick={this.handleSaveFiles}>
                                {I18n.t('commons.save')}
                            </button>
                        </div>
                        <div className="separator" />
                        {renderComponent}
                    </ContentPane>
                )
            }

        } else {
            return (
                <EmptyMessage message={I18n.t('commons.no_selection')}/>
            )
        }
    }
}
ApplicationsEdit.propTypes = {
    selectedItems: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
ApplicationsEdit.defaultProps = {
    selectedItems: [],
    action: null
}
