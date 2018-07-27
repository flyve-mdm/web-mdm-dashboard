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
import WinJS from 'winjs'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import publicURL from 'shared/publicURL'
import getID from 'shared/getID'
import ContentPane from 'components/ContentPane'
import Loading from 'components/Loading'
import Confirmation from 'components/Confirmation'
import FleetsTaskItemList from './FleetsTaskItemList'

/**
 * @class FleetsContent
 * @extends PureComponent
 */
class FleetsContent extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const { itemType } = this.props

    this.state = {
      layout: {
        type: WinJS.UI.ListLayout,
      },
      itemID: undefined,
      itemType,
      selectedItems: [],
      isLoading: false,
      notManaged: false,
      input: '',
      data: {
        policies: undefined,
        tasks: undefined,
        categories: undefined,
        files: undefined,
        applications: undefined,
        tasksNew: {},
        tasksRemove: {},
      },
      devicesLength: 0,
    }
  }

  /**
   * @function componentDidMount
   */
  componentDidMount = () => {
    const { notManaged } = this.state

    if (!notManaged) {
      this.requestAllData()
    } else {
      this.resetData()
    }
  }

  /**
   * @function componentDidUpdate
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      itemID,
      notManaged,
    } = this.state

    if (prevState.itemID !== itemID) {
      if (!notManaged) {
        this.requestAllData()
      } else {
        this.resetData()
      }
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.itemID !== getID(nextProps.history.location.pathname)) {
      return {
        ...prevState,
        isLoading: true,
        itemID: getID(nextProps.history.location.pathname),
        input: nextProps.selectedItems.length === 1 ? nextProps.selectedItems[0]['PluginFlyvemdmFleet.name'] : I18n.t('fleets.new_fleet'),
        notManaged: nextProps.selectedItems.length === 1 ? nextProps.selectedItems[0][
          'PluginFlyvemdmFleet.is_default'
        ] === 1 : false,
        selectedItems: nextProps.selectedItems,
      }
    }
    return null
  }

  /**
   * Get Task value
   * @function getValueOfTask
   * @param {object} policy
   * @param {*} fleetHaveTask
   */
  getValueOfTask = (policy, fleetHaveTask) => {
    const { data } = this.state

    // Check if the current Fleet have a Task that have a relation with this Policy
    if (fleetHaveTask) {
      // Return a Object that is the Task
      switch (policy['PluginFlyvemdmPolicy.type']) {
        case 'deployapp':
        case 'removeapp':
        case 'deployfile':
        case 'removefile':
          return data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? data.tasksNew[policy[
            'PluginFlyvemdmPolicy.id']] : policy['PluginFlyvemdmPolicy.recommended_value']
        default:
          return data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? data.tasksNew[policy[
            'PluginFlyvemdmPolicy.id']].value : policy['PluginFlyvemdmPolicy.recommended_value']
      }
    } else {
      // Return recommended value
      return policy['PluginFlyvemdmPolicy.recommended_value']
    }
  }

  /**
   * Get policy type
   * @function getTypeData
   * @param {object} policy
   */
  getTypeData = (policy) => {
    const { data } = this.state

    const policyType = policy['PluginFlyvemdmPolicy.type']
    // Check if the policy default value are applications, files or other
    switch (policyType) {
      case 'deployapp':
      case 'removeapp':
        return data.applications
      case 'deployfile':
      case 'removefile':
        return data.files
      case 'dropdown':
        return Object.entries(JSON.parse(policy['PluginFlyvemdmPolicy.type_data']))
      default:
        return JSON.parse(policy['PluginFlyvemdmPolicy.type_data'])
    }
  }

  /**
   * handle request all data to show fleet policies
   * @function requestAllData
   * @async
   */
  requestAllData = async () => {
    const {
      glpi,
      changeSelectionMode,
      changeAction,
    } = this.props
    const {
      input,
      itemID,
      itemType,
    } = this.state

    /*
     * Get Devices
     * */
    const devices = await glpi.searchItems({
      itemtype: itemtype.PluginFlyvemdmAgent,
      criteria: [{
        link: 'and',
        field: 3,
        searchtype: 'contains',
        value: input,
      }],
    })

    /*
     * Get Policies
     * */
    const countPolicies = await glpi.searchItems({
      itemtype: itemtype.PluginFlyvemdmPolicy,
      options: {
        uid_cols: true,
        range: '0-0',
      },
    })
    const policies = await glpi.searchItems({
      itemtype: itemtype.PluginFlyvemdmPolicy,
      options: {
        uid_cols: true,
        forcedisplay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        range: `0-${countPolicies.totalcount}`,
      },
    })

    let tasks = []
    const tasksNew = {}

    if (Number(itemID)) {
      /*
       * Get Tasks
       * */
      try {
        const countTasks = await glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmTask,
          options: {
            uid_cols: true,
            range: '0-0',
          },
          criteria: [
            {
              link: 'and',
              field: 9,
              searchtype: 'equals',
              value: itemType,
            },
            {
              link: 'and',
              field: 10,
              searchtype: 'equals',
              value: itemID,
            },
          ],
        })

        tasks = await glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmTask,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3, 5, 6, 7],
            range: `0-${countTasks.totalcount}`,
          },
          criteria: [{
            link: 'and',
            field: 9,
            searchtype: 'equals',
            value: itemType,
          },
          {
            link: 'and',
            field: 10,
            searchtype: 'equals',
            value: itemID,
          },
          ],
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
        }))
        changeSelectionMode(false)
        changeAction('reload')
      }

      if (tasks.data) {
        tasks.data.forEach((task) => {
          const taskDeploy = {
            itemtype_applied: itemType,
            items_id_applied: task['PluginFlyvemdmTask.items_id_applied'],
            plugin_flyvemdm_policies_id: task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id'],
            value: task['PluginFlyvemdmTask.value'],
          }

          if (task['PluginFlyvemdmTask.itemtype']) {
            taskDeploy.itemtype = task['PluginFlyvemdmTask.itemtype']
          }
          if (task['PluginFlyvemdmTask.items_id']) {
            taskDeploy.items_id = task['PluginFlyvemdmTask.items_id']
          }

          const deployType = policies.data.filter(policy => (
            policy['PluginFlyvemdmPolicy.type'] === 'deployapp'
                || policy['PluginFlyvemdmPolicy.type'] === 'removeapp'
                || policy['PluginFlyvemdmPolicy.type'] === 'deployfile'
                || policy['PluginFlyvemdmPolicy.type'] === 'removefile')
              && (policy['PluginFlyvemdmPolicy.id'] === taskDeploy.plugin_flyvemdm_policies_id))

          if (deployType.length > 0) {
            if (tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']]) {
              tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].push(taskDeploy)
            } else {
              tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] = [taskDeploy]
            }
          } else {
            tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] = taskDeploy
          }
        })
      }
    }

    /*
     * Get categories
     * */
    const countCategories = await glpi.searchItems({
      itemtype: itemtype.PluginFlyvemdmPolicyCategory,
      options: {
        uid_cols: true,
        range: '0-0',
      },
    })
    const categories = await glpi.searchItems({
      itemtype: itemtype.PluginFlyvemdmPolicyCategory,
      options: {
        uid_cols: true,
        forcedisplay: [1, 2],
        range: `0-${countCategories.totalcount}`,
      },
    })

    /*
     * Get files
     */
    const files = await glpi.getAllItems({
      itemtype: itemtype.PluginFlyvemdmFile,
    })

    /*
     * Get Applications
     */

    const applications = await glpi.getAllItems({
      itemtype: itemtype.PluginFlyvemdmPackage,
    })

    /*
     * Update props
     */
    this.setState(() => ({
      isLoading: false,
      data: {
        tasks: tasks.data ? tasks.data : [],
        tasksNew,
        policies: policies.data ? policies.data : [],
        categories: categories.data ? categories.data : [],
        files: files || [],
        applications: applications || [],
        tasksRemove: {},
      },
      devicesLength: devices.totalcount,
    }))
  }

  /**
   * Set value when input change
   * @function handleChangeInput
   * @param {object} e
   */
  handleChangeInput = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  /**
   * Get if task is enable/disable
   * @function handleFleetHaveTask
   * @param {object} policy
   * @returns {boolean}
   */
  handleFleetHaveTask = (policy) => {
    const { data } = this.state

    return (!!data.tasksNew[policy['PluginFlyvemdmPolicy.id']])
  }

  /**
   * Reset state
   * @function resetData
   */
  resetData = () => {
    this.setState({
      isLoading: false,
      data: {
        policies: undefined,
        tasks: undefined,
        categories: undefined,
        files: undefined,
        applications: undefined,
        tasksNew: {},
        tasksRemove: {},
      },
      devicesLength: 0,
    })
  }

  /**
   * filter Policies by categorie
   * @function filterPoliciesPerCategory
   * @return {array}
   */
  filterPoliciesPerCategory = () => {
    const { data } = this.state

    const policiesPerCategory = []

    data.categories.forEach((category) => {
      const obj = {}
      const categoryCompleteName = category['PluginFlyvemdmPolicyCategory.completename']
      const policiesPerThisCategory = data.policies.filter(policy => policy['PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename']
          === categoryCompleteName)
      obj.name = categoryCompleteName
      obj.id = category['PluginFlyvemdmPolicyCategory.id']
      obj.policies = policiesPerThisCategory
      policiesPerCategory.push(obj)
    })
    return policiesPerCategory
  }

  /**
   * handle add task from fleet
   * @function handleAddTask
   * @param {object} policy
   */
  handleAddTask = (policy) => {
    const {
      data,
      itemType,
      itemID,
    } = this.state

    if (policy) {
      if (policy['PluginFlyvemdmPolicy.type'] !== 'deployapp'
        && policy['PluginFlyvemdmPolicy.type'] !== 'removeapp'
        && policy['PluginFlyvemdmPolicy.type'] !== 'deployfile'
        && policy['PluginFlyvemdmPolicy.type'] !== 'removefile') {
        const tasks = { ...data.tasksRemove }
        delete tasks[policy['PluginFlyvemdmPolicy.id']]

        const addPolicy = {
          itemtype_applied: itemType,
          items_id_applied: Number(itemID) ? itemID : null,
          plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
          value: policy['PluginFlyvemdmPolicy.recommended_value'],
        }

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            tasksNew: {
              ...prevState.data.tasksNew,
              [policy['PluginFlyvemdmPolicy.id']]: addPolicy,
            },
            tasksRemove: tasks,
          },
        }))
      }
    }
  }

  /**
   * handle remove task from fleet
   * @function handleRemoveTask
   * @param {object} policy
   */
  handleRemoveTask = (policy) => {
    const {
      data,
      itemType,
      itemID,
    } = this.state

    if (policy) {
      const tasks = { ...data.tasksNew }
      delete tasks[policy['PluginFlyvemdmPolicy.id']]
      let removePolicy

      switch (policy['PluginFlyvemdmPolicy.type']) {
        case 'deployapp':
        case 'removeapp':
        case 'deployfile':
        case 'removefile':
          if (data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
            removePolicy = data.tasksNew[policy['PluginFlyvemdmPolicy.id']].map(item => item)
          }
          break
        default:
          removePolicy = {
            itemtype_applied: itemType,
            items_id_applied: Number(itemID) ? itemID : null,
            plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
            value: policy['PluginFlyvemdmPolicy.default_value'],
          }
          break
      }
      if (removePolicy) {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            tasksNew: tasks,
            tasksRemove: {
              ...prevState.data.tasksRemove,
              [policy['PluginFlyvemdmPolicy.id']]: removePolicy,
            },
          },
        }))
      }
    }
  }

  /**
   * handle update task value
   * @function handleUpdateValueTask
   * @param {object} policy
   * @param {*} value
   */
  handleUpdateValueTask = (policy, value) => {
    const {
      itemType,
      itemID,
      data,
    } = this.state


    if (policy) {
      let newDeploy
      let newValue
      let alreadyTask = []
      let tasksToRemove = {}
      switch (policy['PluginFlyvemdmPolicy.type']) {
        case 'bool':
          newValue = value ? 1 : 0
          break
        case 'deployapp':
          newDeploy = {
            itemtype_applied: itemType,
            items_id_applied: Number(itemID) ? itemID : null,
            plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
            value: {
              remove_on_delete: 1,
            },
            items_id: Number(value),
            itemtype: itemtype.PluginFlyvemdmPackage,
          }
          if (data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
            alreadyTask = data.tasksNew[policy['PluginFlyvemdmPolicy.id']].filter(item => item.items_id === newDeploy.items_id)
          }
          tasksToRemove = { ...data.tasksRemove }
          if (tasksToRemove[policy['PluginFlyvemdmPolicy.id']]) {
            data.tasksRemove[policy['PluginFlyvemdmPolicy.id']].forEach((item, index) => {
              if (item.items_id === newDeploy.items_id) {
                tasksToRemove[policy['PluginFlyvemdmPolicy.id']].splice(index, 1)
              }
            })
          }
          break
        case 'removeapp':
        case 'removefile':
          newDeploy = {
            itemtype_applied: itemType,
            items_id_applied: Number(itemID) ? itemID : null,
            plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
            value,
          }
          if (data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
            alreadyTask = data.tasksNew[policy['PluginFlyvemdmPolicy.id']].filter(item => item.value === newDeploy.value)
          }
          tasksToRemove = { ...data.tasksRemove }
          if (tasksToRemove[policy['PluginFlyvemdmPolicy.id']]) {
            data.tasksRemove[policy['PluginFlyvemdmPolicy.id']].forEach((item, index) => {
              if (item.value === newDeploy.value) {
                tasksToRemove[policy['PluginFlyvemdmPolicy.id']].splice(index, 1)
              }
            })
          }
          break
        case 'deployfile':
          newDeploy = {
            itemtype_applied: itemType,
            items_id_applied: Number(itemID) ? itemID : null,
            plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
            value: {
              destination: '%DOCUMENTS%',
              remove_on_delete: 1,
            },
            items_id: Number(value),
            itemtype: itemtype.PluginFlyvemdmFile,
          }
          if (data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
            alreadyTask = data.tasksNew[policy['PluginFlyvemdmPolicy.id']].filter(item => item.items_id === newDeploy.items_id)
          }
          tasksToRemove = { ...data.tasksRemove }
          if (tasksToRemove[policy['PluginFlyvemdmPolicy.id']]) {
            data.tasksRemove[policy['PluginFlyvemdmPolicy.id']].forEach((item, index) => {
              if (item.items_id === newDeploy.items_id) {
                tasksToRemove[policy['PluginFlyvemdmPolicy.id']].splice(index, 1)
              }
            })
          }
          break
        default:
          newValue = value
          break
      }

      if (alreadyTask.length === 0) {
        this.setState((prevState) => {
          if (policy['PluginFlyvemdmPolicy.type'] === 'deployapp'
            || policy['PluginFlyvemdmPolicy.type'] === 'removeapp'
            || policy['PluginFlyvemdmPolicy.type'] === 'deployfile'
            || policy['PluginFlyvemdmPolicy.type'] === 'removefile') {
            let newDeployAdd = []
            if (prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
              newDeployAdd = [
                ...prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']],
                newDeploy,
              ]
            } else {
              newDeployAdd = [
                newDeploy,
              ]
            }

            return {
              data: {
                ...prevState.data,
                tasksNew: {
                  ...prevState.data.tasksNew,
                  [policy['PluginFlyvemdmPolicy.id']]: newDeployAdd,
                },
                tasksRemove: tasksToRemove,
              },
            }
          }
          return {
            data: {
              ...prevState.data,
              tasksNew: {
                ...prevState.data.tasksNew,
                [policy['PluginFlyvemdmPolicy.id']]: {
                  ...prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']],
                  value: newValue,
                },
              },
            },
          }
        })
      }
    }
  }

  /**
   * Handle remove task value
   * @function handleRemoveValueTask
   * @param {object} policy
   * @param {object} task
   */
  handleRemoveValueTask = (policy, task) => {
    const {
      data,
      itemType,
      itemID,
    } = this.state

    let newTasks

    if (data.tasksNew[task.plugin_flyvemdm_policies_id]) {
      switch (policy['PluginFlyvemdmPolicy.type']) {
        case 'deployapp':
        case 'deployfile':
          newTasks = data.tasksNew[task.plugin_flyvemdm_policies_id].filter(item => item.items_id !== task.items_id)
          break
        case 'removeapp':
        case 'removefile':
          newTasks = data.tasksNew[task.plugin_flyvemdm_policies_id].filter(item => item.value !== task.value)
          break
        default:
          break
      }

      const removePolicy = {
        itemtype_applied: itemType,
        items_id_applied: Number(itemID) ? itemID : null,
        plugin_flyvemdm_policies_id: task.plugin_flyvemdm_policies_id,
        value: task.value,
      }

      if (task.itemtype) {
        removePolicy.itemtype = task.itemtype
      }
      if (task.items_id) {
        removePolicy.items_id = task.items_id
      }

      let newRemoveTasks = []
      if (data.tasksRemove[task.plugin_flyvemdm_policies_id]) {
        newRemoveTasks = [...data.tasksRemove[task.plugin_flyvemdm_policies_id], removePolicy]
      } else {
        newRemoveTasks = [removePolicy]
      }

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          tasksNew: {
            ...prevState.data.tasksNew,
            [task.plugin_flyvemdm_policies_id]: newTasks,
          },
          tasksRemove: {
            ...prevState.data.tasksRemove,
            [task.plugin_flyvemdm_policies_id]: newRemoveTasks,
          },
        },
      }))
    }
  }

  /**
   * Handle save Fleet
   * @function handleSaveFleet
   * @async
   */
  handleSaveFleet = async () => {
    const {
      itemType,
      notManaged,
    } = this.state
    const { selectedItems } = this.props

    if (itemType === itemtype.PluginFlyvemdmFleet) {
      if (selectedItems.length === 1) {
        if (!notManaged) {
          this.handleUpdateFleet()
        } else {
          this.handleUpdateFleetName()
        }
      } else {
        this.handleCreateFleet()
      }
    } else {
      this.handleUpdateFleet()
    }
  }

  /**
   * Handle update fleet name
   * @function handleUpdateFleetName
   * @async
   */
  handleUpdateFleetName = async () => {
    const {
      input,
      itemID,
    } = this.state
    const {
      glpi,
      changeAction,
    } = this.props

    try {
      this.setState({
        isLoading: true,
      })
      const fleetToUpdate = {
        name: input,
      }

      await glpi.updateItem({
        itemtype: itemtype.PluginFlyvemdmFleet,
        id: itemID,
        input: fleetToUpdate,
      })

      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.fleet_successfully_updated'),
        type: 'success',
      })

      changeAction('reload')

      this.setState({
        isLoading: false,
      })
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

  /**
   * handle update fleet
   * @function handleUpdateFleet
   * @async
   */
  // eslint-disable-next-line
  handleUpdateFleet = async () => {
    const {
      input,
      data,
      itemType,
      itemID,
    } = this.state
    const {
      glpi,
    } = this.props

    this.setState({
      isLoading: true,
    })
    const fleetToUpdate = {
      name: input,
    }
    let itemsToDelete = []

    if (data.tasksRemove) {
      itemsToDelete = data.tasks.filter((task) => {
        // Check if the same Policy id is equal on object to remove
        if (Array.isArray(data.tasksRemove[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']])) {
          const value = data.tasksRemove[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].filter(
            (item) => {
              if (item.items_id) {
                return item.items_id === task['PluginFlyvemdmTask.items_id']
              }
              return item.value === task['PluginFlyvemdmTask.value']
            },
          )

          return value.length > 0
        }
        return !!data.tasksRemove[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']]
      }).map(item => ({
        id: item['PluginFlyvemdmTask.id'],
      }))
    }
    const itemsToUpdate = []

    const specialPolicies = data.policies.filter(policy => policy['PluginFlyvemdmPolicy.type'] === 'deployapp' || policy['PluginFlyvemdmPolicy.type']
        === 'removeapp' || policy['PluginFlyvemdmPolicy.type'] === 'deployfile' || policy['PluginFlyvemdmPolicy.type']
        === 'removefile')

    data.tasks.forEach((task) => {
      if (data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']]) {
        let idDeployApp

        for (const element of specialPolicies) {
          if (element['PluginFlyvemdmPolicy.id'] === task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']) {
            idDeployApp = element['PluginFlyvemdmPolicy.id']
            break
          }
        }

        if (!idDeployApp) {
          if (data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].value !== task[
            'PluginFlyvemdmTask.value']) {
            itemsToUpdate.push({
              id: task['PluginFlyvemdmTask.id'],
              value: data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].value,
            })
          }
        }
      }
    })

    const itemsToAdd = { ...data.tasksNew }
    // eslint-disable-next-line
    data.tasks.forEach((task) => {
      if (Array.isArray(itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']])) {
        data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].forEach((item, index) => {
          if (task['PluginFlyvemdmTask.items_id']) {
            return item.items_id === task['PluginFlyvemdmTask.items_id'] ? itemsToAdd[task[
              'PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].splice(index, 1) : null
          }
          return item.value === task['PluginFlyvemdmTask.value'] ? itemsToAdd[task[
            'PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].splice(index, 1) : null
        })
      } else {
        return itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] ? delete itemsToAdd[task[
          'PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] : null
      }
    })

    const itemsToSave = []
    Object.values(itemsToAdd).forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((deploy) => {
          itemsToSave.push(deploy)
        })
      } else {
        itemsToSave.push(item)
      }
    })
    try {
      if (itemType === itemtype.PluginFlyvemdmFleet) {
        await glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmFleet,
          id: itemID,
          input: fleetToUpdate,
        })
      }
      if (itemsToDelete.length > 0) {
        await glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmTask,
          input: itemsToDelete,
        })
      }

      if (itemsToUpdate.length > 0) {
        await glpi.updateItem({
          itemtype: itemtype.PluginFlyvemdmTask,
          input: itemsToUpdate,
        })
      }

      if (itemsToSave.length > 0) {
        await glpi.addItem({
          itemtype: itemtype.PluginFlyvemdmTask,
          input: itemsToSave,
        })
      }

      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.fleet_successfully_updated'),
        type: 'success',
      })
      this.requestAllData()
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.requestAllData()
    }
  }

  /**
   * handle create new fleet
   * @function handleCreateFleet
   * @async
   */
  handleCreateFleet = async () => {
    const {
      input,
      data,
    } = this.state
    const {
      glpi,
      changeSelectionMode,
      changeAction,
    } = this.props

    this.setState({
      isLoading: true,
    })

    try {
      const fleetToCreate = {
        name: input,
      }

      const newFleet = await glpi.addItem({
        itemtype: itemtype.PluginFlyvemdmFleet,
        input: fleetToCreate,
      })

      const itemsToAdd = { ...data.tasksNew }

      data.tasks.map(task => (itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] ? delete itemsToAdd[task[
        'PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] : null))

      const itemsToSave = []
      Object.values(itemsToAdd).forEach((item) => {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        if (Array.isArray(item)) {
          item.forEach((deploy) => {
            deploy.items_id_applied = newFleet.id

            try {
              const objValue = JSON.parse(deploy.value)
              deploy.value = objValue
            } catch (e) {}

            itemsToSave.push(deploy)
          })
        } else {
          item.items_id_applied = newFleet.id
          itemsToSave.push(item)
        }
      })

      if (itemsToSave.length > 0) {
        await glpi.addItem({
          itemtype: itemtype.PluginFlyvemdmTask,
          input: itemsToSave,
        })
      }

      this.setState({
        isLoading: false,
      })
      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.fleet_successfully_created'),
        type: 'success',
      })
      changeSelectionMode(false)
      changeAction('reload')
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

  /**
   * Handle remove fleet
   * @function handleDeleteFleet
   * @async
   * @param {object} eventObject
   */
  handleDeleteFleet = async () => {
    const {
      selectedItems,
      glpi,
      changeSelectionMode,
      changeAction,
    } = this.props
    const { itemID } = this.state

    if (selectedItems.length === 1) {
      this.setState({
        isLoading: true,
      })

      try {
        await glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmFleet,
          id: itemID,
        })

        this.setState({
          isLoading: false,
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.fleet_successfully_removed'),
          type: 'success',
        })
        changeSelectionMode(false)
        changeAction('reload')
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
  }

  /**
   * handle duplicate selected fleet
   * @function handleDuplicateFleet
   */
  handleDuplicateFleet = () => {
    this.setState(prevState => ({
      input: prevState.input !== '' ? prevState.input.concat(' copy') : 'Copy',
      data: {
        tasks: [],
        tasksNew: prevState.data.tasksNew,
        policies: prevState.data.policies,
        categories: prevState.data.categories,
        files: prevState.data.files,
        applications: prevState.data.applications,
        tasksRemove: {},
      },
    }), () => {
      this.handleCreateFleet()
    })
  }

  /**
   * Go to devices list
   * @function goToList
   */
  goToList = () => {
    const { history } = this.props
    const { itemID } = this.state

    history.push(`${publicURL}/app/fleets/${itemID}/list`)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      data,
      isLoading,
      itemType,
      input,
      devicesLength,
      notManaged,
    } = this.state
    const { selectedItems } = this.props

    let policiesPerCategory

    if (data.policies
      && data.categories
      && data.tasksNew
      && data.files
      && data.applications) {
      policiesPerCategory = this.filterPoliciesPerCategory()
    }
    if (isLoading) {
      return (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    }
    return (
      <ContentPane>
        <div className="fleets" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: '-moz-flex', flexDirection: 'row' }}>
            <div className="content-header">
              {
                  itemType === itemtype.PluginFlyvemdmFleet
                    ? (
                      <React.Fragment>
                        <h1 className="content-header__title">
                          <input
                            type="text"
                            className="win-textbox"
                            placeholder={I18n.t('fleets.input_name')}
                            name="fleetName"
                            onChange={this.handleChangeInput}
                            value={input}
                          />
                        </h1>
                        <div
                          className="devices__length"
                          onClick={this.goToList}
                          role="button"
                          tabIndex="0"
                        >
                          <div>
                            {devicesLength}
                          </div>
                          <Icon iconName="CellPhone" />
                        </div>
                      </React.Fragment>
                    )
                    : ''
                }
              <div className="item-info">
                <Icon
                  iconName="Save"
                  onClick={this.handleSaveFleet}
                />
                {
                  selectedItems.length !== 0 && itemType === itemtype.PluginFlyvemdmFleet
                    ? (
                      <React.Fragment>
                        <Icon
                          iconName="Copy"
                          onClick={this.handleDuplicateFleet}
                        />
                        <Icon
                          iconName="Delete"
                          onClick={this.handleDeleteFleet}
                        />
                      </React.Fragment>
                    )
                    : ''
                }
              </div>
              <div className="item-info" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <div />
              </div>
            </div>
          </div>
          <div style={{ display: '-moz-flex', flexDirection: 'row' }}>
            <div className="separator" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', overflowY: 'auto' }}>
            <div className="content-info">
              <h3 style={{ margin: '10px' }}>
                {I18n.t('fleets.tasks_per_Category')}
              </h3>
              <div>
                {
                  policiesPerCategory ? (
                    policiesPerCategory.map(category => (category.policies.length > 0
                      ? (
                        <div key={category.id}>
                          <div className="title">
                            {category.name}
                          </div>
                          <div>
                            {category.policies.map((policy, index) => (
                              <FleetsTaskItemList
                                key={[policy['PluginFlyvemdmPolicy.name'], index].join('_')}
                                fleetHaveTask={this.handleFleetHaveTask(policy)}
                                data={policy}
                                value={this.getValueOfTask(policy, this.handleFleetHaveTask(policy))}
                                addTask={this.handleAddTask}
                                removeTask={this.handleRemoveTask}
                                updateValueTask={this.handleUpdateValueTask}
                                removeValueTask={this.handleRemoveValueTask}
                                typeData={this.getTypeData(policy)}
                              />
                            ))}
                          </div>
                        </div>
                      )
                      : null))
                  )
                    : notManaged
                      ? (
                        <h1>
                          {I18n.t('fleets.not_managed')}
                        </h1>
                      )
                      : (
                        <h1>
                          {I18n.t('fleets.loading_tasks')}
                        </h1>
                      )}
              </div>
            </div>
          </div>
          <Confirmation
            title="Delete Fleets"
            message={`${selectedItems.length} Fleets`}
            reference={(el) => { this.contentDialog = el }}
          />
        </div>
      </ContentPane>
    )
  }
}

FleetsContent.defaultProps = {
  selectedItems: null,
  itemType: null,
}

FleetsContent.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  selectedItems: PropTypes.array,
  itemType: PropTypes.string,
}

export default FleetsContent
