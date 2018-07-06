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
import {
  FilesUpload,
  FilesUploadItemList,
} from '../../../components/FilesUpload'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import itemtype from '../../../shared/itemtype'

/**
 * @class FilesAdd
 * @extends PureComponent
 */
export default class FilesAdd extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      isLoading: false,
    }
  }

  /**
   * Handle change file
   * @function onFilesChange
   * @param {object} files
   */
  onFilesChange = (files) => {
    this.setState({
      files,
    })
  }

  /**
   * Handle show file errors
   * @function onFilesError
   * @param {object} file
   * @param {object} error
   */
  onFilesError = (error) => {
    const {
      handleMessage,
    } = this.props

    this.props.toast.setNotification(handleMessage({
      type: 'alert',
      message: error.message,
    }))
  }

  /**
   * Handle remove files from list
   * @function filesRemoveOne
   * @param {object} file
   */
  filesRemoveOne = (file) => {
    this.files.removeFile(file)
  }

  /**
   * Handle remove all files from list
   * @function filesRemoveAll
   */
  filesRemoveAll = () => {
    this.files.removeFiles()
  }

  /**
   * Handle upload files
   * @function filesUpload
   */
  filesUpload = () => {
    const { files } = this.state
    const {
      glpi,
      changeAction,
      handleMessage,
    } = this.props

    const formData = new FormData()

    Object.keys(files).forEach(async (key) => {
      try {
        const file = files[key]
        formData.append('file', file)
        formData.append('uploadManifest', `{"input":{"name":"${file.name}"}}`)
        this.setState({
          isLoading: true,
        })
        await glpi.uploadFile({
          itemtype: itemtype.PluginFlyvemdmFile,
          input: formData,
        })
        this.setState({
          isLoading: false,
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.saved_file'),
          type: 'success',
        })
        changeAction('reload')
      } catch (error) {
        this.props.toast.setNotification(handleMessage({
          type: 'alert',
          message: error,
        }))
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  render() {
    const {
      isLoading,
      files,
    } = this.state

    let renderComponent
    if (isLoading) {
      renderComponent = (<Loading message={`${I18n.t('commons.loading')}...`} />)
    } else {
      renderComponent = (
        <ContentPane>
          <div style={{ margin: '0 10px' }}>
            <div className="content-header">
              <h2 className="content-header__title">
                {I18n.t('commons.new_file')}
              </h2>
            </div>
            <div className="separator" />
            <div style={{ padding: '10px' }}>
              <React.Fragment>
                <FilesUpload
                  ref={(filesUpload) => { this.files = filesUpload }}
                  className="files-dropzone"
                  onChange={this.onFilesChange}
                  onError={this.onFilesError}
                  maxFiles={1}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  {I18n.t('commons.drop_file')}
                </FilesUpload>
                <div style={{ marginTop: 10 }}>
                  <button
                    className="btn btn--primary"
                    onClick={this.filesUpload}
                    type="button"
                  >
                    {I18n.t('commons.save')}
                  </button>
                  {
                      files.length > 0
                        ? (
                          <div>
                            {
                              files.map(file => (
                                <FilesUploadItemList
                                  key={file.id}
                                  fileData={file}
                                  onRemove={() => this.filesRemoveOne(file)}
                                />
                              ))
                            }
                          </div>
                        )
                        : null
                    }
                </div>
              </React.Fragment>
            </div>
          </div>
        </ContentPane>
      )
    }
    return renderComponent
  }
}
/** FilesAdd propTypes */
FilesAdd.propTypes = {
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}
