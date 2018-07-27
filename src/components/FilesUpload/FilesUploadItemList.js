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
import { Icon } from 'office-ui-fabric-react/lib/Icon'

/**
 * Component with the layout of the list of files to upload
 * @class FilesUploadItemList
 * @extends PureComponent
 */
class FilesUploadItemList extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="files-list">
        <div className="files-list__content">
          <div className="files-list__item">
            <div className="icon files-list__item-icon">
              <Icon iconName="Page" />
            </div>
            <div className="files-list__item-content-primary">
              <div className="files-list__content-text-primary">
                {this.props.fileData.name}
              </div>
              <div className="files-list__content-text-secondary">
                {this.props.fileData.extension}
              </div>
              <div className="files-list__content-text-secondary">
                {this.props.fileData.sizeReadable}
              </div>
            </div>
            <div className="files-list__item-content-secondary">
              <div className="icon files-list__item-icon">
                <Icon
                  iconName="Delete"
                  style={{ fontSize: '18px' }}
                  onClick={this.props.onRemove}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FilesUploadItemList.propTypes = {
  fileData: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default FilesUploadItemList
