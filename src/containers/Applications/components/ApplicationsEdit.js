/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../shared/i18n'
import ApplicationsEditItemList from './ApplicationsEditItemList'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import itemtype from '../../../shared/itemtype'

/**
 * @class ApplicationsEdit
 * @extends PureComponent
 */
export default class ApplicationsEdit extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const { selectedItems } = this.props

    this.state = {
      itemListEdit: [...selectedItems],
      isLoading: false,
    }
  }

  /**
   * @function updateItemList
   * @param {int} index
   * @param {name} name
   */
  updateItemList = (index, name) => {
    const { itemListEdit } = this.state

    const newItem = [...itemListEdit]

    // Find index of specific object using findIndex method.
    const objIndex = newItem.findIndex((obj => obj.id === index));

    // Update object's name property.
    if (objIndex !== -1) {
      newItem[objIndex].alias = name
    } else {
      const item = {
        id: index,
        alias: name,
      }
      newItem.push(item)
    }

    this.setState({
      itemListEdit: [...newItem],
    })
  }

  /**
   * Handle files save
   * @async
   * @function handleSaveFiles
   */
  handleSaveFiles = async () => {
    const { itemListEdit } = this.state
    const {
      glpi,
      changeSelectionMode,
      changeAction,
      handleMessage,
    } = this.props

    try {
      if (itemListEdit.length > 0) {
        this.setState({
          isLoading: true,
        })
        await glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmPackage,
          input: itemListEdit,
        })

        if (itemListEdit.length > 1) {
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.edited_files'),
            type: 'success',
          })
        } else {
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.edited_file'),
            type: 'success',
          })
        }

        changeSelectionMode(false)
        changeAction('reload')
      }
    } catch (error) {
      this.props.toast.setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const {
      selectedItems,
      history,
    } = this.props
    const { isLoading } = this.state

    if (selectedItems) {
      if (isLoading) {
        return (
          <Loading message={`${I18n.t('commons.loading')}...`} />
        )
      }
      const renderComponent = selectedItems.map((item, index) => (
        <ApplicationsEditItemList
          key={`ApplicationsEditItemList-${index.toString()}`}
          history={history}
          updateItemList={this.updateItemList}
          selectedItem={item}
        />
      ))

      return (
        <ContentPane>
          <div className="content-header" style={{ margin: '0 10px' }}>
            <h2 className="content-header__title">
              {I18n.t('applications.edit')}
            </h2>
            <button
              className="btn btn--primary"
              onClick={this.handleSaveFiles}
              type="button"
            >
              {I18n.t('commons.save')}
            </button>
          </div>
          <div className="separator" />
          {renderComponent}
        </ContentPane>
      )
    }
    return (
      <EmptyMessage message={I18n.t('commons.no_selection')} />
    )
  }
}
/** ApplicationsEdit propTypes */
ApplicationsEdit.propTypes = {
  selectedItems: PropTypes.array,
  changeSelectionMode: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
/** ApplicationsEdit defaultProps */
ApplicationsEdit.defaultProps = {
  selectedItems: [],
}
