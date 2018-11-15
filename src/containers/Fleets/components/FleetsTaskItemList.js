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
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
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

    this.state = {
      fleetHaveTask: this.props.fleetHaveTask,
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
    this.updateState(this.props.fleetHaveTask)
    let input
    if (this.props.data['PluginFlyvemdmPolicy.type'] === 'removeapp'
      || this.props.data['PluginFlyvemdmPolicy.type'] === 'removefile') {
      input = ''
    } else {
      input = (this.props.value || '')
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
    if (!this.state.alreadyAdded) {
      this.props.addTask(this.props.data)
    } else {
      this.props.removeTask(this.props.data)
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
    switch (this.props.data['PluginFlyvemdmPolicy.type']) {
      case 'bool':
        this.props.updateValueTask(this.props.data, !this.props.value)
        break
      case 'int':
      case 'deployapp':
      case 'deployfile':
        if (`${this.state.input}`.trim()) {
          this.props.updateValueTask(this.props.data, this.state.input)
        }
        break
      case 'removeapp':
      case 'removefile':
        if (`${this.state.input}`.trim()) {
          this.props.updateValueTask(this.props.data, this.state.input)
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
    switch (this.props.data['PluginFlyvemdmPolicy.type']) {
      case 'deployapp':
      case 'deployfile':
      case 'dropdown':
        if (e.target.value.trim()) {
          this.props.updateValueTask(this.props.data, e.target.value)
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
    this.props.removeValueTask(this.props.data, task)
  }

  /**
   * Get render show max/min version os
   * @function renderMinMaxVersion
   * @return {array}
   */
  renderMinMaxVersion = () => {
    const renderComponent = []
    const systemPrivilegies = this.props.data['PluginFlyvemdmPolicy.is_android_system'] === 1 ? I18n.t('fleets.system_privileges') : ''
    const tooltipTop = this.props.data['PluginFlyvemdmPolicy.is_android_system'] === 1 ? '-54px' : '-32px'
    if (this.props.data['PluginFlyvemdmPolicy.android_min_version'] !== 0) {
      renderComponent.push(
        <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_android_min`}>
          <span className="badge android">
            Android
            <span className="tooltip" style={{ top: tooltipTop }}>
              {
                `> ${this.props.data['PluginFlyvemdmPolicy.android_min_version']} `
              }
              {
                this.props.data['PluginFlyvemdmPolicy.android_max_version'] !== 0
                  ? `< ${this.props.data['PluginFlyvemdmPolicy.android_max_version']} `
                  : ''
              }
              <div>
                {
                  systemPrivilegies
                }
              </div>
            </span>
          </span>
        </React.Fragment>,
      )
    } else {
      renderComponent.push(
        <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_android_min`}>
          <span className="badge not_available">
            Android
            <span className="tooltip">
              {I18n.t('commons.not_available')}
            </span>
          </span>
        </React.Fragment>,
      )
    }

    if (this.props.data['PluginFlyvemdmPolicy.apple_min_version'] !== 0) {
      renderComponent.push(
        <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_apple_min`}>
          <span className="badge apple">
            iOS
            <span className="tooltip">
              {
                `> ${this.props.data['PluginFlyvemdmPolicy.apple_min_version']} `
              }
              {
                this.props.data['PluginFlyvemdmPolicy.apple_max_version'] !== 0
                  ? `< ${this.props.data['PluginFlyvemdmPolicy.apple_max_version']} `
                  : ''
              }
            </span>
          </span>
        </React.Fragment>,
      )
    } else {
      renderComponent.push(
        <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_apple_min`}>
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
    if (this.props.data === undefined) {
      return (
        <div
          className="files-list fleet-list"
          style={{ display: 'block' }}
        >
          <div style={{ display: 'table' }}>
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                  <div className="files-list__content-text-primary">
                    {I18n.t('commons.not_available')}
                  </div>
                </div>
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
                  checked={this.state.alreadyAdded}
                  onChange={() => this.handleAddedToggle}
                  labelOn=""
                  labelOff=""
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
    switch (this.props.data['PluginFlyvemdmPolicy.type']) {
      case 'bool':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`files-list__item-list-field files-list__checkbox ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}
              onClick={this.handleActivePolicyToggle}
              role="button"
              tabIndex="0"
            >
              <span
                className={`iconFont ${this.props.value === 1 ? 'selectIcon' : 'unselectIcon'}`}
              />
            </div>
          </div>
        )
      case 'int':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}>
              <input
                type="number"
                className="win-textbox"
                placeholder={this.props.data['PluginFlyvemdmPolicy.name']}
                name={this.props.data['PluginFlyvemdmPolicy.id']}
                value={this.state.input}
                onChange={this.handleChangeInput}
                onBlur={this.handleBlurInput}
              />
            </div>
          </div>
        )
      case 'dropdown':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}>
              <select
                name={this.props.data['PluginFlyvemdmPolicy.id']}
                value={this.props.value}
                onChange={this.handleChangeInput}
              >
                {
                  this.props.typeData.map(type => (
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
        )
      case 'deployapp':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}>
              <select
                name={this.props.data['PluginFlyvemdmPolicy.id']}
                value={0}
                onChange={this.handleChangeInput}
              >
                <option value={0}>
                  {I18n.t('commons.select_an_application')}
                </option>
                {
                  this.props.typeData.map((type, index) => (
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
                data={this.props.value}
                typeData={this.props.typeData}
                removeTask={this.handleRemoveTask}
              />
            </div>
          </div>
        )
      case 'removeapp':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}>
              <input
                type="text"
                className="win-textbox"
                placeholder={I18n.t('commons.package_name')}
                name={this.props.data['PluginFlyvemdmPolicy.id']}
                value={this.state.input}
                onChange={this.handleChangeInput}
              />
              <span
                className="iconFont addIcon"
                style={{ padding: '0 10px', fontSize: '18px' }}
                onClick={this.handleBlurInput}
                role="button"
                tabIndex="0"
              />
              <TasksRemoveAppList
                data={this.props.value}
                removeTask={this.handleRemoveTask}
              />
            </div>
          </div>
        )
      case 'deployfile':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}>
              <select
                name={this.props.data['PluginFlyvemdmPolicy.id']}
                value={0}
                onChange={this.handleChangeInput}
              >
                <option value={0}>
                  {I18n.t('commons.select_a_file')}
                </option>
                {
                    this.props.typeData.map((type, index) => (
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
                data={this.props.value}
                typeData={this.props.typeData}
                removeTask={this.handleRemoveTask}
              />
            </div>
          </div>
        )
      case 'removefile':
        return (
          <div
            className="files-list fleet-list"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'table' }}>
              <div className="files-list__content">
                <div className="files-list__item">
                  <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                    <div className="files-list__content-text-primary">
                      {this.props.data['PluginFlyvemdmPolicy.name']}
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
                        checked={this.state.alreadyAdded}
                        onChange={() => this.handleAddedToggle}
                        labelOn=""
                        labelOff=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}>
              <input
                type="text"
                className="win-textbox"
                placeholder={I18n.t('files.input_name')}
                name={this.props.data['PluginFlyvemdmPolicy.id']}
                value={this.state.input}
                onChange={this.handleChangeInput}
              />
              <span
                className="iconFont addIcon"
                style={{ padding: '0 10px', fontSize: '18px' }}
                onClick={this.handleBlurInput}
                role="button"
                tabIndex="0"
              />
              <TasksRemoveFileList
                data={this.props.value}
                removeTask={this.handleRemoveTask}
              />
            </div>
          </div>
        )
      default:
        return (
          <div className="files-list fleet-list">
            <div className="files-list__content">
              <div className="files-list__item">
                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
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
