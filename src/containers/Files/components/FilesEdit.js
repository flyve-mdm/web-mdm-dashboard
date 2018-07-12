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
import FilesEditItemList from './FilesEditItemList'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import itemtype from '../../../shared/itemtype'

/**
 * @class FilesEdit
 * @extends PureComponent
 */
export default class FilesEdit extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: [],
      isLoading: false,
    }
  }

  /**
   * @function updateItemList
   * @param {int} index
   * @param {name} name
   */
  updateItemList = (index, name) => {
    const { selectedItem } = this.state

    const newItem = [...selectedItem]

    // Find index of specific object using findIndex method.
    const objIndex = newItem.findIndex((obj => obj.id === index));

    // Update object's name property.
    if (objIndex !== -1) {
      newItem[objIndex].name = name
    } else {
      const item = {
        id: index,
        name,
      }
      newItem.push(item)
    }

    this.setState({
      selectedItem: newItem,
    })
  }

  /**
   * Handle files save
   * @async
   * @function handleSaveFiles
   */
  handleSaveFiles = async () => {
    const { selectedItem } = this.state

    try {
      if (selectedItem.length > 0) {
        this.setState({
          isLoading: true,
        })
        await this.props.glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmFile,
          input: selectedItem,
        })

        if (selectedItem.length > 1) {
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
    const { isLoading } = this.state

    if (this.props.selectedItems) {
      if (isLoading) {
        return (
          <Loading message={`${I18n.t('commons.loading')}...`} />
        )
      }
      const renderComponent = this.props.selectedItems.map((item, index) => (
        <FilesEditItemList
          key={`FilesEditItemList-${index.toString()}`}
          updateItemList={this.updateItemList}
          selectedItem={item}
        />
      ))

      return (
        <ContentPane>
          <div className="content-header" style={{ margin: '0 10px' }}>
            <div style={{ overflow: 'auto' }}>
              <button
                className="btn btn--primary"
                style={{ marginTop: 0 }}
                onClick={this.handleSaveFiles}
                type="button"
              >
                {I18n.t('commons.save')}
              </button>
            </div>
          </div>
          <div className="separator" />
          {renderComponent}
        </ContentPane>
      )
    }
    return null
  }
}

FilesEdit.defaultProps = {
  selectedItems: null,
}

/** FilesEdit propTypes */
FilesEdit.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  selectedItems: PropTypes.array,
  changeSelectionMode: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}
