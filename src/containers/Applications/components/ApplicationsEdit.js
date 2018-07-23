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

    this.state = {
      itemListEdit: [...this.props.selectedItems],
      isLoading: false,
    }
  }

  /**
   * @function updateItemList
   * @param {int} index
   * @param {name} name
   */
  updateItemList = (index, name) => {
    const newItem = [...this.state.itemListEdit]

    // Find index of specific object using findIndex method.
    const objIndex = newItem.findIndex((obj => obj.id === index))

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
    try {
      if (this.state.itemListEdit.length > 0) {
        this.setState({
          isLoading: true,
        })
        await this.props.glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmPackage,
          input: this.state.itemListEdit,
        })

        if (this.state.itemListEdit.length > 1) {
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

        this.props.changeSelectionMode(false)
        this.props.changeAction('reload')
      }
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    if (this.props.selectedItems) {
      if (this.state.isLoading) {
        return (
          <Loading message={`${I18n.t('commons.loading')}...`} />
        )
      }
      const renderComponent = this.props.selectedItems.map((item, index) => (
        <ApplicationsEditItemList
          key={`ApplicationsEditItemList-${index.toString()}`}
          history={this.props.history}
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
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  selectedItems: PropTypes.array,
  changeSelectionMode: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
/** ApplicationsEdit defaultProps */
ApplicationsEdit.defaultProps = {
  selectedItems: [],
}
