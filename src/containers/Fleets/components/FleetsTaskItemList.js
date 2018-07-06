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
import ReactWinJS from 'react-winjs'
import I18n from '../../../shared/i18n'
import PropTypes from 'prop-types'
import TasksDeployAppList from './TasksDeployAppList'
import TasksRemoveAppList from './TasksRemoveAppList'
import TasksDeployFileList from './TaskDeployFileList'
import TasksRemoveFileList from './TasksRemoveFileList'

/**
 * @class FleetsTaskItemList
 * @extends PureComponent
 */
class FleetsTaskItemList extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const { fleetHaveTask } = this.props

    this.state = {
      fleetHaveTask,
      alreadyAdded: false,
      active: false,
      input: '',
    }
  }

  /**
   * Set state from fleets
   * @function componentDidMount
   */
  componentDidMount = () => {
    const {
      fleetHaveTask,
      data,
      value,
    } = this.props

    this.updateState(fleetHaveTask)
    let input
    if (data['PluginFlyvemdmPolicy.type'] === 'removeapp'
      || data['PluginFlyvemdmPolicy.type'] === 'removefile') {
      input = ''
    } else {
      input = (value || '')
    }
    this.setState({
      input,
    })
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    let input
    if (nextProps.data['PluginFlyvemdmPolicy.type'] === 'removeapp'
      || nextProps.data['PluginFlyvemdmPolicy.type'] === 'removefile') {
      input = ''
    } else {
      input = nextProps.value ? nextProps.value : ''
    }

    if (nextProps.fleetHaveTask !== prevState.fleetHaveTask) {
      if (nextProps.fleetHaveTask) {
        return {
          fleetHaveTask: nextProps.fleetHaveTask,
          alreadyAdded: true,
          active: true,
          input,
        }
      }
      return {
        fleetHaveTask: nextProps.fleetHaveTask,
        alreadyAdded: false,
        active: false,
        input,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * Update state fleets
   * @function updateState
   * @param {*} fleetHaveTask
   */
  updateState = (fleetHaveTask) => {
    if (fleetHaveTask) {
      this.setState({
        alreadyAdded: true,
        active: true,
      })
    } else {
      this.setState({
        alreadyAdded: false,
        active: false,
        input: '',
      })
    }
  }

  /**
   * handle when enable/disable policies
   * @function handleAddedToggle
   */
  handleAddedToggle = () => {
    const { alreadyAdded } = this.state
    const {
      addTask,
      removeTask,
      data,
    } = this.props

    if (!alreadyAdded) {
      addTask(data)
    } else {
      removeTask(data)
    }
    this.setState(prevState => ({
      alreadyAdded: !prevState.alreadyAdded,
    }))
  }

  /**
   * Update task value
   * @function handleActivePolicyToggle
   */
  handleActivePolicyToggle = () => {
    const {
      data,
      updateValueTask,
      value,
    } = this.props
    const { input } = this.state
    switch (data['PluginFlyvemdmPolicy.type']) {
      case 'bool':
        updateValueTask(data, !value)
        break
      case 'int':
      case 'deployapp':
      case 'deployfile':
        if (`${input}`.trim()) {
          updateValueTask(data, input)
        }
        break
      case 'removeapp':
      case 'removefile':
        if (`${input}`.trim()) {
          updateValueTask(data, input)
          this.setState({
            input: '',
          })
        }
        break
      default:
        break
    }
  }

  /**
   * Update task value when input change
   * @function handleChangeInput
   * @param {object} e
   */
  handleChangeInput = (e) => {
    const {
      data,
      updateValueTask,
    } = this.props

    switch (data['PluginFlyvemdmPolicy.type']) {
      case 'deployapp':
      case 'deployfile':
      case 'dropdown':
        if (e.target.value.trim()) {
          updateValueTask(data, e.target.value)
        }
        break
      default:
        this.setState({
          input: e.target.value,
        })
        break
    }
  }

  /**
   * request update task value
   * @function handleBlurInput
   */
  handleBlurInput = () => {
    this.handleActivePolicyToggle()
  }

  /**
   * Request task remove
   * @function handleRemoveTask
   * @param {*} task
   */
  handleRemoveTask = (task) => {
    const {
      removeValueTask,
      data,
    } = this.props

    removeValueTask(data, task)
  }

  /**
   * Get render show max/min version os
   * @function renderMinMaxVersion
   * @return {array}
   */
  renderMinMaxVersion = () => {
    const { data } = this.props

    const renderComponent = []

    if (data['PluginFlyvemdmPolicy.android_min_version'] !== 0) {
      renderComponent.push(
        <React.Fragment key={`${data['PluginFlyvemdmPolicy.id']}_android_min`}>
          <span className="badge android">
            Android
            <span className="tooltip">
              {
                `> ${data['PluginFlyvemdmPolicy.android_min_version']} `
              }
              {
                data['PluginFlyvemdmPolicy.android_max_version'] !== 0
                  ? `< ${data['PluginFlyvemdmPolicy.android_max_version']} `
                  : ''
              }
            </span>
          </span>
        </React.Fragment>,
      )
    } else {
      renderComponent.push(
        <React.Fragment key={`${data['PluginFlyvemdmPolicy.id']}_android_min`}>
          <span className="badge not_available">
            Android
            <span className="tooltip">
              {I18n.t('commons.not_available')}
            </span>
          </span>
        </React.Fragment>,
      )
    }

    if (data['PluginFlyvemdmPolicy.apple_min_version'] !== 0) {
      renderComponent.push(
        <React.Fragment key={`${data['PluginFlyvemdmPolicy.id']}_apple_min`}>
          <span className="badge apple">
            iOS
            <span className="tooltip">
              {
                `> ${data['PluginFlyvemdmPolicy.apple_min_version']} `
              }
              {
                data['PluginFlyvemdmPolicy.apple_max_version'] !== 0
                  ? `< ${data['PluginFlyvemdmPolicy.apple_max_version']} `
                  : ''
              }
            </span>
          </span>
        </React.Fragment>,
      )
    } else {
      renderComponent.push(
        <React.Fragment key={`${data['PluginFlyvemdmPolicy.id']}_apple_min`}>
          <span className="badge not_available">
            iOS
            <span className="tooltip">
              {I18n.t('commons.not_available')}
            </span>
          </span>
        </React.Fragment>,
      )
    }
    return renderComponent
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      data,
      typeData,
      value,
    } = this.props
    const {
      alreadyAdded,
      input,
    } = this.state

    if (data === undefined) {
      return (
        <div className="files-list fleet-list">
          <div className="files-list__content">
            <div className="files-list__item">
              <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                <div className="files-list__content-text-primary">
                  {I18n.t('commons.not_available')}
                </div>
              </div>
              <div className="files-list__item-content-secondary">
                <div
                  className="files-list__item-icon"
                  onClick={this.handleAddedToggle}
                  role="button"
                  tabIndex="0"
                >
                  <ReactWinJS.ToggleSwitch
                    className="files-list__content-text-primary"
                    checked={alreadyAdded}
                    onChange={() => this.handleAddedToggle}
                    labelOn=""
                    labelOff=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    switch (data['PluginFlyvemdmPolicy.type']) {
      case 'bool':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div
                    className={`files-list__item-list-field files-list__checkbox ${alreadyAdded && 'files-list__item-list-field--active'}`}
                    onClick={this.handleActivePolicyToggle}
                    role="button"
                    tabIndex="0"
                  >
                    {
                      value === 1
                        ? <span className="selectIcon" />
                        : <span className="unselectIcon" />
                    }
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div className="files-list__item-content-secondary">
                  <div
                    className="files-list__item-icon"
                    onClick={this.handleAddedToggle}
                    role="button"
                    tabIndex="0"
                  >
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'int':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div className={`files-list__item-list-field ${alreadyAdded && 'files-list__item-list-field--active'}`}>
                    <input
                      type="number"
                      className="win-textbox"
                      placeholder={data['PluginFlyvemdmPolicy.name']}
                      name={data['PluginFlyvemdmPolicy.id']}
                      value={input}
                      onChange={this.handleChangeInput}
                      onBlur={this.handleBlurInput}
                    />
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div className="files-list__item-content-secondary ">
                  <div
                    className="files-list__item-icon"
                    onClick={this.handleAddedToggle}
                    role="button"
                    tabIndex="0"
                  >
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'dropdown':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div className={`files-list__item-list-field ${alreadyAdded && 'files-list__item-list-field--active'}`}>
                    <select
                      name={data['PluginFlyvemdmPolicy.id']}
                      value={value}
                      onChange={this.handleChangeInput}
                    >
                      {
                        typeData.map(type => (
                          <option
                            key={type[0]}
                            value={type[0]}
                          >
                            {type[1]}
                          </option>
                        ))
                        }
                    </select>
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div
                  className="files-list__item-content-secondary"
                  onClick={this.handleAddedToggle}
                  role="button"
                  tabIndex="0"
                >
                  <div className="files-list__item-icon">
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'deployapp':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div className={`files-list__item-list-field ${alreadyAdded && 'files-list__item-list-field--active'}`}>
                    <select
                      name={data['PluginFlyvemdmPolicy.id']}
                      value={0}
                      onChange={this.handleChangeInput}
                    >
                      <option value={0}>
                        {I18n.t('commons.select_an_application')}
                      </option>
                      {
                        typeData.map((type, index) => (
                          <option
                            key={`${type.id}_${index.toString()}`}
                            value={type.id}
                          >
                            {type.alias}
                          </option>
                        ))
                      }
                    </select>
                    <TasksDeployAppList
                      data={value}
                      typeData={typeData}
                      removeTask={this.handleRemoveTask}
                    />
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div className="files-list__item-content-secondary ">
                  <div
                    className="files-list__item-icon"
                    onClick={this.handleAddedToggle}
                    role="button"
                    tabIndex="0"
                  >
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'removeapp':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div className={`files-list__item-list-field ${alreadyAdded && 'files-list__item-list-field--active'}`}>
                    <input
                      type="text"
                      className="win-textbox"
                      placeholder={I18n.t('commons.package_name')}
                      name={data['PluginFlyvemdmPolicy.id']}
                      value={input}
                      onChange={this.handleChangeInput}
                    />
                    <span
                      className="addIcon"
                      style={{ padding: '0 10px', fontSize: '18px' }}
                      onClick={this.handleBlurInput}
                      role="button"
                      tabIndex="0"
                    />
                    <TasksRemoveAppList
                      data={value}
                      removeTask={this.handleRemoveTask}
                    />
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div className="files-list__item-content-secondary ">
                  <div
                    className="files-list__item-icon"
                    onClick={this.handleAddedToggle}
                    role="button"
                    tabIndex="0"
                  >
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'deployfile':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div className={`files-list__item-list-field ${alreadyAdded && 'files-list__item-list-field--active'}`}>
                    <select
                      name={data['PluginFlyvemdmPolicy.id']}
                      value={0}
                      onChange={this.handleChangeInput}
                    >
                      <option value={0}>
                        {I18n.t('commons.select_a_file')}
                      </option>
                      {
                          typeData.map((type, index) => (
                            <option
                              key={`${type.id}_${index.toString()}`}
                              value={type.id}
                            >
                              {type.name}
                            </option>
                          ))
                        }
                    </select>
                    <TasksDeployFileList
                      data={value}
                      typeData={typeData}
                      removeTask={this.handleRemoveTask}
                    />
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div className="files-list__item-content-secondary ">
                  <div
                    className="item-icon"
                    onClick={this.handleAddedToggle}
                    role="button"
                    tabIndex="0"
                  >
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'removefile':
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {data['PluginFlyvemdmPolicy.name']}
                  </div>
                  <div className={`files-list__item-list-field ${alreadyAdded && 'files-list__item-list-field--active'}`}>
                    <input
                      type="text"
                      className="win-textbox"
                      placeholder={I18n.t('files.input_name')}
                      name={data['PluginFlyvemdmPolicy.id']}
                      value={input}
                      onChange={this.handleChangeInput}
                    />
                    <span
                      className="addIcon"
                      style={{ padding: '0 10px', fontSize: '18px' }}
                      onClick={this.handleBlurInput}
                      role="button"
                      tabIndex="0"
                    />
                    <TasksRemoveFileList
                      data={value}
                      removeTask={this.handleRemoveTask}
                    />
                  </div>
                </div>
                <div className="files-list__item-content-secondary version">
                  {this.renderMinMaxVersion()}
                </div>
                <div className="files-list__item-content-secondary ">
                  <div
                    className="files-list__item-icon"
                    onClick={this.handleAddedToggle}
                    role="button"
                    tabIndex="0"
                  >
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={alreadyAdded}
                      onChange={() => this.handleAddedToggle}
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {I18n.t('commons.not_available')}
                  </div>
                </div>
                <div className="files-list__item-content-secondary ">
                  <div className="files-list__item-icon">
                    <ReactWinJS.ToggleSwitch
                      className="files-list__content-text-primary"
                      checked={false}
                      disabled
                      labelOn=""
                      labelOff=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }
}

FleetsTaskItemList.defaultProps = {
  typeData: null,
  value: null,
}

FleetsTaskItemList.propTypes = {
  removeValueTask: PropTypes.func.isRequired,
  updateValueTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  fleetHaveTask: PropTypes.bool.isRequired,
  typeData: PropTypes.any,
  value: PropTypes.any,
}

export default FleetsTaskItemList
