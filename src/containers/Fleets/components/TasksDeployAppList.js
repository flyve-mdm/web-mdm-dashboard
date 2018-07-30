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
import { Icon } from 'office-ui-fabric-react'

/**
 * @class TasksDeployAppList
 * @extends PureComponent
 */
class TasksDeployAppList extends PureComponent {
  /**
   * @function componentDidMount
   */
  componentDidMount() {
    this.refreshRender()
  }

  /**
   * @function refreshRender
   * @return {*}
   */
  refreshRender = () => (Array.isArray(this.props.data)
    ? this.props.data.map(item => this.props.typeData.map(value => (item.items_id === value.id
      ? (
        <div className="files-list" style={{ width: '320px' }} key={value.id}>
          <div className="files-list-content">
            <div className="files-list__item">
              <div className="files-list__item-content-primary">
                <div className="files-list__content-text-primary">
                  {value.alias}
                </div>
                <div className="files-list__content-text-secondary">
                  {value.package_name}
                </div>
              </div>
              <div className="files-list__item-content-secondary">
                <div className="files-list__item-icon">
                  <Icon
                    iconName="Delete"
                    style={{ fontSize: '18px' }}
                    onClick={() => this.handleRemove(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      : null)))
    : null)

  /**
   * @function handleRemove
   * @param {*} task
   */
  handleRemove = (task) => {
    this.props.removeTask(task)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return this.refreshRender()
  }
}

TasksDeployAppList.defaultProps = {
  data: null,
  typeData: null,
}

TasksDeployAppList.propTypes = {
  removeTask: PropTypes.func.isRequired,
  data: PropTypes.any,
  typeData: PropTypes.any,
}

export default TasksDeployAppList
