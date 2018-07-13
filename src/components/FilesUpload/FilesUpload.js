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

import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import bytesToSize from '../../shared/bytesToSize'
import I18n from '../../shared/i18n'

/**
 * Component used to upload files
 * @class FilesUpload
 * @extends PureComponent
 */
export default class FilesUpload extends PureComponent {
  /**
   * Get mime type left
   * @function mimeTypeLeft
   * @param {string} mime
   */
  static mimeTypeLeft(mime) {
    return mime.split('/')[0]
  }

  /**
   * Get mime type right
   * @function mimeTypeRight
   * @param {string} mime
   */
  static mimeTypeRight(mime) {
    return mime.split('/')[1]
  }

  /**
   * Get the extension of the file
   * @function fileExtension
   * @param {object} file
   */
  static fileExtension(file) {
    const extensionSplit = file.name.split('.')
    if (extensionSplit.length > 1) {
      return extensionSplit[extensionSplit.length - 1]
    }
    return 'none'
  }

  /** @constructor */
  constructor(props) {
    super(props)

    this.id = 1
    this.state = {
      files: [],
    }
  }

  /**
   * change the native behavior of the browser to add files to a list in the state
   * @function onDrop
   * @param {object} event
   */
  onDrop = (event) => {
    event.preventDefault()
    this.onDragLeave(event)

    /** Collect added files, perform checking, cast pseudo-array to Array,
     * then return to method
     */
    let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files

    /** Multiple files dropped when not allowed */
    if (this.props.multiple === false && filesAdded.length > 1) {
      filesAdded = [filesAdded[0]]
    }

    const files = []
    for (let i = 0; i < filesAdded.length; i += 1) {
      const file = filesAdded[i]

      /** Assign file an id */
      file.id = `files-${this.id += 1}`
      /** Tell file it's own extension */
      file.extension = FilesUpload.fileExtension(file)
      /** Tell file it's own size */
      file.filesize = file.size
      /** Tell file it's own readable size */
      file.sizeReadable = bytesToSize(file.size)
      /** Add preview, either image or file extension */

      if (file.type && FilesUpload.mimeTypeLeft(file.type) === 'image') {
        file.preview = {
          type: 'image',
          url: window.URL.createObjectURL(file),
        }
      } else {
        file.preview = {
          type: 'file',
        }
      }

      /** Check for file max limit */
      if (this.state.files.length + files.length >= this.props.maxFiles) {
        this.onError({
          code: 4,
          message: I18n.t('files_upload.maximum_count'),
        }, file)
        break
      }

      /** If file is acceptable, push or replace */
      if (this.fileTypeAcceptable(file) && this.fileSizeAcceptable(file)) {
        files.push(file)
      }
    }

    this.setState((prevState) => {
      ({
        files: this.props.multiple === false ? files : [...prevState.files, ...files],
      })
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  /**
   * Execute the function to handle the errors
   * @function onError
   * @param {*} error
   * @param {object} file
   */
  onError(error, file) {
    this.props.onError.call(this, error, file)
  }

  /**
   * Change the native behavior of the browser by 'stopPropagation'
   * @function onDragOver
   * @param {*} event
   */
  static onDragOver(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * Change the styles of the Dropbox when the file enters it
   * @function onDragEnter
   */
  onDragEnter() {
    const el = this.dropzone
    el.className += ` ${this.props.dropActiveClassName}`
  }

  /**
   * Change the styles of the Dropbox when the file leaves it
   * @function onDragLeave
   */
  onDragLeave() {
    const el = this.dropzone
    this.dropzone.className = el.className.replace(` ${this.props.dropActiveClassName}`, '')
  }

  /**
   * Open the windows to select the files
   * @function openFileChooser
   */
  openFileChooser = () => {
    this.inputElement.value = null
    this.inputElement.click()
  }

  /**
   * Validate the type of the file
   * @function fileTypeAcceptable
   * @param {object} file
   */
  fileTypeAcceptable(file) {
    if (this.props.accepts) {
      if (file.type) {
        const typeLeft = FilesUpload.mimeTypeLeft(file.type)
        const typeRight = FilesUpload.mimeTypeRight(file.type)
        for (let i = 0; i < this.props.accepts.length; i += 1) {
          const accept = this.props.accepts[i]
          const acceptLeft = accept.split('/')[0]
          const acceptRight = accept.split('/')[1]
          if (acceptLeft && acceptRight) {
            if (acceptLeft === typeLeft && acceptRight === '*') {
              return true
            }
            if (acceptLeft === typeLeft && acceptRight === typeRight) {
              return true
            }
          }
        }
      }
      this.onError({
        code: 1,
        message: `${file.name} ${I18n.t('files_upload.invalid_type')}`,
      }, file)
      return false
    }
    return true
  }

  /**
   * Validate the size of the file
   * @function fileSizeAcceptable
   * @param {object} file
   */
  fileSizeAcceptable(file) {
    if (file.size > this.props.maxFileSize) {
      this.onError({
        code: 2,
        message: `${file.name} ${I18n.t('files_upload.too_large')}`,
      }, file)
      return false
    } if (file.size < this.props.minFileSize) {
      this.onError({
        code: 3,
        message: `${file.name} ${I18n.t('files_upload.too_small')}`,
      }, file)
      return false
    }
    return true
  }

  /**
   * Remove a file of the list
   * @function removeFile
   * @param {object} fileToRemove
   */
  removeFile(fileToRemove) {
    this.setState((prevState) => {
      ({
        files: prevState.files.filter(file => file.id !== fileToRemove.id),
      })
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  /**
   * Remove all files of the list
   * @function removeFiles
   */
  removeFiles() {
    this.setState({
      files: [],
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const inputAttributes = {
      type: 'file',
      accept: this.props.accepts ? this.props.accepts.join() : '',
      multiple: this.props.multiple,
      name: this.props.name,
      style: {
        display: 'none',
      },
      ref: (element) => {
        this.inputElement = element
      },
      onChange: this.onDrop,
    }

    return (
      <div className="file-upload">
        <input
          {...inputAttributes}
        />
        <div
          className={this.props.className}
          onClick={
            this.props.clickable === true
              ? this.openFileChooser
              : null
          }
          onDrop={this.onDrop}
          onDragOver={FilesUpload.onDragOver}
          onDragEnter={FilesUpload.onDragEnter}
          onDragLeave={FilesUpload.onDragLeave}
          ref={(dropzone) => { this.dropzone = dropzone }}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

FilesUpload.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  dropActiveClassName: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  accepts: PropTypes.array,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number,
  minFileSize: PropTypes.number,
  clickable: PropTypes.bool,
  name: PropTypes.string,
  style: PropTypes.object,
}

FilesUpload.defaultProps = {
  onChange: () => {},
  onError: () => {},
  className: 'files-dropzone',
  dropActiveClassName: 'files-dropzone-active',
  accepts: null,
  multiple: true,
  maxFiles: Infinity,
  maxFileSize: Infinity,
  minFileSize: 0,
  name: 'file',
  clickable: true,
  style: {},
}
