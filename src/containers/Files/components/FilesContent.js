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
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import publicURL from 'shared/publicURL'
import ContentPane from 'components/ContentPane'
import Confirmation from 'components/Confirmation'
import Loading from 'components/Loading'

/**
 * @class FilesContent
 * @extends PureComponent
 */
export default class FilesContent extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }

    if (this.props.selectedItems.length === 0) {
      const path = `${publicURL}/app/files`
      this.props.history.push(path)
    }
  }

  /**
   * Handle edit selected file
   * @async
   * @function handleEdit
   */
  handleEdit = () => {
    const location = `${this.props.history.location.pathname}/edit`
    this.props.history.push(location)
  }

  /**
   * Handle delete current file
   * @async
   * @function handleDelete
   */
  handleDelete = async () => {
    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        const itemListToDelete = this.props.selectedItems.map(item => ({
          id: item['PluginFlyvemdmFile.id'],
        }))

        this.setState({
          isLoading: true,
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmFile,
          input: itemListToDelete,
          queryString: {
            force_purge: true,
          },
        })

        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.file_successfully_removed'),
          type: 'success',
        })
        this.props.changeSelectionMode(false)
        this.props.changeAction('reload')
      } else {
        this.setState({
          isLoading: false,
        })
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
    if (this.state.isLoading) {
      return (
        <Loading
          message={
            `${I18n.t('commons.loading')}...`
          }
        />
      )
    }

    const fileName = this.props.selectedItems.length > 0 ? this.props.selectedItems[0]['PluginFlyvemdmFile.name']
      : ''
    return (
      <ContentPane>
        <div className="content-header" style={{ margin: '0 10px' }}>
          <div className="item-info">
            <span className="fileIcon" style={{ fontSize: '48px', paddingLeft: '20px', paddingTop: '20px' }} />
            <div>
              <div className="item-info__name">
                {fileName}
              </div>
              <br />
              <div>
                <span
                  className="editIcon"
                  style={{ marginRight: '20px', fontSize: '20px' }}
                  onClick={this.handleEdit}
                  role="button"
                  tabIndex="0"
                />
                <span
                  className="deleteIcon"
                  style={{ marginRight: '20px', fontSize: '20px' }}
                  onClick={this.handleDelete}
                  role="button"
                  tabIndex="0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="separator" />
        <Confirmation
          title={I18n.t('files.delete_one')}
          message={fileName}
          reference={(el) => { this.contentDialog = el }}
        />
      </ContentPane>
    )
  }
}

FilesContent.defaultProps = {
  selectedItems: null,
}

/** FilesContent propTypes */
FilesContent.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  selectedItems: PropTypes.array,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
