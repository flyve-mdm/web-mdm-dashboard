import React, { Component } from 'react'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import Confirmation from '../../../components/Confirmation'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'

class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
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
                tasksRemove: {}
            }
        }
    }

    componentDidMount = () => {
        this.setState({
            input: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]["PluginFlyvemdmFleet.name"] : 'New Feet',
            notManaged: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]["PluginFlyvemdmFleet.is_default"] === 1 ? true : false : false
        }, () => {
            if (!this.state.notManaged) {
                this.requestAllData()
            } else {
                this.resetData()
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedItems && (prevProps.selectedItems !== this.props.selectedItems)) {
            this.setState({
                input: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]["PluginFlyvemdmFleet.name"] : 'New Fleet',
                notManaged: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]["PluginFlyvemdmFleet.is_default"] === 1 ? true : false : false
            }, () => {
                if (!this.state.notManaged) {
                    this.requestAllData()
                } else {
                    this.resetData()
                }
            })
        }
    }

    resetData = () => {
        this.setState({
            data: {
                policies: undefined,
                tasks: undefined,
                categories: undefined,
                files: undefined,
                applications: undefined,
                tasksNew: {},
                tasksRemove: {}
            }
        })
    }

    requestAllData = async () => {
        this.setState((prevState, props) => ({
            isLoading: true
        }))

        /*
         * Get Policies 
         * */
        const policies = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmPolicy,
            options: {
                uid_cols: true,
                forcedisplay: [1, 2, 3, 4, 5, 6, 7, 8],
                range: '0-50' // Can more than 50 items
            }
        })

        let tasks = []
        let tasksNew= {} 
        
        if (this.props.selectedItems.length > 0) {
        /*
         * Get Tasks 
         * */
            try {
                tasks = await this.props.glpi.getSubItems({
                    itemtype: itemtype.PluginFlyvemdmFleet,
                    id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id'],
                    subItemtype: 'PluginFlyvemdmTask'
                })
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.props.changeSelectionMode(false)
                this.props.changeAction('reload')         
            }
            
            tasks.forEach((task, index) => {

                let taskDeploy = {
                    plugin_flyvemdm_fleets_id: task['plugin_flyvemdm_fleets_id'],
                    plugin_flyvemdm_policies_id: task['plugin_flyvemdm_policies_id'],
                    value: task['value']
                }

                if (task['items_id']) {
                    taskDeploy['items_id'] = task['items_id']
                }
                if (task['itemtype']) {
                    taskDeploy['itemtype'] = task['itemtype']
                }

                const deployType = policies.data.filter(policy => {
                    return (
                        policy['PluginFlyvemdmPolicy.type'] === 'deployapp' || 
                        policy['PluginFlyvemdmPolicy.type'] === 'removeapp' || 
                        policy['PluginFlyvemdmPolicy.type'] === 'deployfile' ||
                        policy['PluginFlyvemdmPolicy.type'] === 'removefile') 
                        && (policy['PluginFlyvemdmPolicy.id'] === taskDeploy['plugin_flyvemdm_policies_id'])
                })

                if (deployType.length > 0) {

                    if (tasksNew[task['plugin_flyvemdm_policies_id']]) {
                        tasksNew[task['plugin_flyvemdm_policies_id']].push(taskDeploy)
                    } else {
                        tasksNew[task['plugin_flyvemdm_policies_id']] = [taskDeploy]
                    }
                    
                } else {
                    tasksNew[task['plugin_flyvemdm_policies_id']] = taskDeploy
                }
            })
        }

        /*
         * Get categories
         * */
        const categories = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmPolicyCategory,
            options: {
                uid_cols: true,
                forcedisplay: [1, 2]
            }
        })

        /* 
        * Get files
        */
        const files = await this.props.glpi.getAllItems({
            itemtype: itemtype.PluginFlyvemdmFile,
            queryString: { range: '0-50' }
        })

        /* 
        * Get Applications
        */
        
        const applications = await this.props.glpi.getAllItems({ 
            itemtype: itemtype.PluginFlyvemdmPackage, 
            queryString: { range: '0-50' } 
        })

        /* 
        * Update props
        */
        this.setState((prevState, props) => ({
            isLoading: false,
            data: {
                tasks, 
                tasksNew: tasksNew,
                policies: policies.data,
                categories: categories.data, 
                files: files, 
                applications: applications,
                tasksRemove: {}
            }
        }))

    }

    handleChangeInput = (e) => {
        this.setState({ input: e.target.value })
    }
    
    handleFleetHaveTask = policy => {
        return this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? true : false
    }

    getTypeData = policy => {
        const policyType = policy['PluginFlyvemdmPolicy.type']
        // Check if the policy default value are applications, files or other
        switch (policyType) {
            case 'deployapp':
            case 'removeapp':
                return this.state.data.applications
            case 'deployfile':
            case 'removefile':
                return this.state.data.files
            case 'dropdown':
                return Object.entries(JSON.parse(policy['PluginFlyvemdmPolicy.type_data']))
            default:
                return JSON.parse(policy['PluginFlyvemdmPolicy.type_data'])
        }
    }

    getValueOfTask = (policy, fleetHaveTask) => {
        // Check if the current Fleet have a Task that have a relation with this Policy
        if (fleetHaveTask) {
            // Return a Object that is the Task
            switch (policy['PluginFlyvemdmPolicy.type']) {
                case 'deployapp':
                case 'removeapp':
                case 'deployfile':
                case 'removefile':
                    return this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']] : policy['PluginFlyvemdmPolicy.recommended_value']
                default:
                    return this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]['value'] : policy['PluginFlyvemdmPolicy.recommended_value']
            }
        } else {
            // Return recommended value
            return policy['PluginFlyvemdmPolicy.recommended_value']
        }
    }

    filterPoliciesPerCategory = () => {
        const policiesPerCategory = []

        this.state.data.categories.forEach(category => {
            let obj = {}
            let categoryCompleteName = category['PluginFlyvemdmPolicyCategory.completename']
            let policiesPerThisCategory = this.state.data.policies.filter(policy => {
                // Check if the same Policy Category name is equal to the Category name
                return policy['PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename'] === categoryCompleteName
            })
            obj['name'] = categoryCompleteName
            obj['id'] = category['PluginFlyvemdmPolicyCategory.id']
            obj['policies'] = policiesPerThisCategory
            policiesPerCategory.push(obj)
        })
        return policiesPerCategory
    }

    handleAddTask = (policy) => {
        if (policy) {
            if (policy['PluginFlyvemdmPolicy.type'] !== 'deployapp' && 
                policy['PluginFlyvemdmPolicy.type'] !== 'removeapp' &&
                policy['PluginFlyvemdmPolicy.type'] !== 'deployfile' &&
                policy['PluginFlyvemdmPolicy.type'] !== 'removefile') {
                let tasks = { ...this.state.data.tasksRemove }
                delete tasks[policy['PluginFlyvemdmPolicy.id']]

                let addPolicy = {
                    plugin_flyvemdm_fleets_id: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
                    plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                    value: policy['PluginFlyvemdmPolicy.recommended_value']
                }

                this.setState((prevState, props) => ({
                    data: { ...prevState.data, tasksNew: { ...prevState.data.tasksNew, [policy['PluginFlyvemdmPolicy.id']]: addPolicy }, tasksRemove: tasks }
                }))
            }
        }
    }

    handleRemoveTask = (policy) => {
        if (policy) {
            let tasks = { ...this.state.data.tasksNew}
            delete tasks[policy['PluginFlyvemdmPolicy.id']]
            let removePolicy

            switch (policy['PluginFlyvemdmPolicy.type']) {
                case 'deployapp':
                case 'removeapp':
                case 'deployfile':
                case 'removefile':
                    if (this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
                        removePolicy = this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']].map(item => item)
                    }
                    break
                default:
                    removePolicy = {
                        plugin_flyvemdm_fleets_id: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
                        plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                        value: policy['PluginFlyvemdmPolicy.default_value']
                    }
                    break
            }
            if (removePolicy) {
                this.setState((prevState, props) => ({
                    data: {
                        ...prevState.data,
                        tasksNew: tasks,
                        tasksRemove: {
                            ...prevState.data.tasksRemove,
                            [policy['PluginFlyvemdmPolicy.id']]: removePolicy
                        }
                    }
                }))
            }
        }
    }

    handleUpdateValueTask = (policy, value) => {
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
                        plugin_flyvemdm_fleets_id: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
                        plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                        value: {remove_on_delete:1},
                        items_id: Number(value),
                        itemtype: itemtype.PluginFlyvemdmPackage
                    }
                    if (this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
                        alreadyTask = this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']].filter(item => {
                            return item['items_id'] === newDeploy['items_id']
                        })
                    }
                    tasksToRemove = { ...this.state.data.tasksRemove }
                    if (tasksToRemove[policy['PluginFlyvemdmPolicy.id']]) {
                        this.state.data.tasksRemove[policy['PluginFlyvemdmPolicy.id']].forEach((item, index) => {
                            if (item['items_id'] === newDeploy['items_id']) {
                                tasksToRemove[policy['PluginFlyvemdmPolicy.id']].splice(index, 1)
                            }
                        })
                    }
                    break
                case 'removeapp':
                case 'removefile':
                    newDeploy = {
                        plugin_flyvemdm_fleets_id: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
                        plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                        value: value
                    }
                    if (this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
                        alreadyTask = this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']].filter(item => {
                            return item['value'] === newDeploy['value']
                        })
                    }
                    tasksToRemove = { ...this.state.data.tasksRemove }
                    if (tasksToRemove[policy['PluginFlyvemdmPolicy.id']]) {
                        this.state.data.tasksRemove[policy['PluginFlyvemdmPolicy.id']].forEach((item, index) => {
                            if (item['value'] === newDeploy['value']) {
                                tasksToRemove[policy['PluginFlyvemdmPolicy.id']].splice(index, 1)
                            }
                        })
                    }
                    break
                case 'deployfile':
                    newDeploy = {
                        plugin_flyvemdm_fleets_id: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
                        plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                        value: { destination: "%DOCUMENTS%", remove_on_delete: 1 },
                        items_id: Number(value),
                        itemtype: itemtype.PluginFlyvemdmFile
                    }
                    if (this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
                        alreadyTask = this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']].filter(item => {
                            return item['items_id'] === newDeploy['items_id']
                        })
                    }
                    tasksToRemove = { ...this.state.data.tasksRemove }
                    if (tasksToRemove[policy['PluginFlyvemdmPolicy.id']]) {
                        this.state.data.tasksRemove[policy['PluginFlyvemdmPolicy.id']].forEach((item, index) => {
                            if (item['items_id'] === newDeploy['items_id']) {
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
                this.setState((prevState, props) => {

                    if (policy['PluginFlyvemdmPolicy.type'] === 'deployapp' || 
                        policy['PluginFlyvemdmPolicy.type'] === 'removeapp' ||
                        policy['PluginFlyvemdmPolicy.type'] === 'deployfile' ||
                        policy['PluginFlyvemdmPolicy.type'] === 'removefile' ) {

                        let newDeployAdd = []
                        if (prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]) {
                            newDeployAdd = [
                                ...prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']],
                                newDeploy
                            ]
                        } else {
                            newDeployAdd = [
                                newDeploy
                            ]
                        }

                        return {
                            data: {
                                ...prevState.data,
                                tasksNew: {
                                    ...prevState.data.tasksNew,
                                    [policy['PluginFlyvemdmPolicy.id']]: newDeployAdd
                                },
                                tasksRemove: tasksToRemove
                            }
                        }
                    } else {
                        return {
                            data: {
                                ...prevState.data,
                                tasksNew: {
                                    ...prevState.data.tasksNew,
                                    [policy['PluginFlyvemdmPolicy.id']]: {
                                        ...prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']],
                                        value: newValue
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }
    }

    handleRemoveValueTask = (policy, task) => {
        let newTasks

        if (this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']]) {

            switch (policy['PluginFlyvemdmPolicy.type']) {
                case 'deployapp':
                case 'deployfile':
                    newTasks = this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']].filter(item => {
                        return item['items_id'] !== task['items_id']
                    })
                    break
                case 'removeapp':
                case 'removefile':
                    newTasks = this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']].filter(item => {
                        return item['value'] !== task['value']
                    })
                    break
                default:
                    break
            }

            let removePolicy = {
                plugin_flyvemdm_fleets_id: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
                plugin_flyvemdm_policies_id: task['plugin_flyvemdm_policies_id'],
                value: task['value']
            }

            if (task['itemtype']) {
                removePolicy['itemtype'] = task['itemtype']
            }
            if (task['items_id']) {
                removePolicy['items_id'] = task['items_id']
            }

            let newRemoveTasks = []
            if (this.state.data.tasksRemove[task['plugin_flyvemdm_policies_id']]) {
                newRemoveTasks = [...this.state.data.tasksRemove[task['plugin_flyvemdm_policies_id']], removePolicy]
            } else {
                newRemoveTasks = [removePolicy]
            }

            this.setState((prevState, props) => ({
                data: {
                    ...prevState.data,
                    tasksNew: {
                        ...prevState.data.tasksNew,
                        [task['plugin_flyvemdm_policies_id']]: newTasks
                    },
                    tasksRemove: { ...prevState.data.tasksRemove, [task['plugin_flyvemdm_policies_id']]: newRemoveTasks }
                }
            }))
        }        
    }

    handleSaveFleet = async () => {
        if(this.props.selectedItems.length === 1) {
            if (!this.state.notManaged) {
                this.handleUpdateFleet()
            } else {
                this.handleUpdateFleetName()
            }
            
        } else {
            this.handleCreateFleet()
        }
    }

    handleUpdateFleetName = async () => {
        try {
            this.setState({
                isLoading: true
            })
            const fleetToUpdate = {
                name: this.state.input
            }

            await this.props.glpi.updateItem({ itemtype: itemtype.PluginFlyvemdmFleet, id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id'], input: fleetToUpdate })
            this.props.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.fleet_successfully_updated'),
                type: 'success'
            })
            this.props.changeAction('reload')
            this.setState({
                isLoading: false
            })
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({
                isLoading: false
            })
        }
    }

    handleUpdateFleet = async () => {
        this.setState({
            isLoading: true
        })
        const fleetToUpdate = {
            name: this.state.input
        }
        let itemsToDelete = []
        if (this.state.data.tasksRemove) {
            itemsToDelete = this.state.data.tasks.filter(task => {
                // Check if the same Policy id is equal on object to remove
                if (Array.isArray(this.state.data.tasksRemove[task['plugin_flyvemdm_policies_id']])) {
                    const value = this.state.data.tasksRemove[task['plugin_flyvemdm_policies_id']].filter(item => {
                        if (item['items_id']) {
                            return item['items_id'] === task['items_id'] ? true : false
                        } else {
                            return item['value'] === task['value'] ? true : false
                        }
                    })
                    return value.length > 0 ? true : false
                } else {
                    return this.state.data.tasksRemove[task['plugin_flyvemdm_policies_id']] ? true : false
                }
                
            }).map((item) => {
                return {
                    id: item["id"]
                }
            })
        }
        let itemsToUpdate = []

        const specialPolicies = this.state.data.policies.filter(policy => {
            return policy['PluginFlyvemdmPolicy.type'] === 'deployapp' || policy['PluginFlyvemdmPolicy.type'] === 'removeapp' || policy['PluginFlyvemdmPolicy.type'] === 'deployfile' || policy['PluginFlyvemdmPolicy.type'] === 'removefile'
        })

        this.state.data.tasks.forEach(task => {

            if (this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']]) {
                let idDeployApp

                for (let element of specialPolicies) {
                    if (element['PluginFlyvemdmPolicy.id'] === task['plugin_flyvemdm_policies_id']) {
                        idDeployApp = element['PluginFlyvemdmPolicy.id']
                        break
                    }
                }

                if (!idDeployApp) {
                    if (this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']]['value'] !== task['value']) {
                        itemsToUpdate.push({
                            id: task['id'],
                            value: this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']]['value']
                        })
                    }

                }
            }
        })
        let itemsToAdd = { ...this.state.data.tasksNew }

        this.state.data.tasks.forEach(task => {
            
            if (Array.isArray(itemsToAdd[task['plugin_flyvemdm_policies_id']])) {
                this.state.data.tasksNew[task['plugin_flyvemdm_policies_id']].forEach((item, index) => {
                    if (task['items_id']) {
                        return item['items_id'] === task['items_id'] ? itemsToAdd[task['plugin_flyvemdm_policies_id']].splice(index, 1) : null
                    } else {
                        return item['value'] === task['value'] ? itemsToAdd[task['plugin_flyvemdm_policies_id']].splice(index, 1) : null
                    }
                })
            } else {
                return itemsToAdd[task['plugin_flyvemdm_policies_id']] ? delete itemsToAdd[task['plugin_flyvemdm_policies_id']] : null
            }
        })

        let itemsToSave = []
        Object.values(itemsToAdd).forEach(item => {
            if (Array.isArray(item)) {
                item.forEach(deploy => {
                    itemsToSave.push(deploy)
                })
            } else {
                itemsToSave.push(item)
            }
        })
        try {

            await this.props.glpi.updateItem({ itemtype: itemtype.PluginFlyvemdmFleet, id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id'], input: fleetToUpdate })

            if (itemsToDelete.length > 0) {
                await this.props.glpi.deleteItem({ itemtype: itemtype.PluginFlyvemdmTask, input: itemsToDelete })
            }

            if (itemsToUpdate.length > 0) {
                await this.props.glpi.updateItem({ itemtype: itemtype.PluginFlyvemdmTask, input: itemsToUpdate })
            }

            if (itemsToSave.length > 0) {
                await this.props.glpi.addItem({ itemtype: itemtype.PluginFlyvemdmTask, input: itemsToSave })
            }

            this.props.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.fleet_successfully_updated'),
                type: 'success'
            })
            this.requestAllData()
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.requestAllData()
        }
    }

    handleCreateFleet = async () => {
        this.setState({
            isLoading: true
        })

        try {
            const fleetToCreate = {
                name: this.state.input
            }

            const newFleet = await this.props.glpi.addItem({ itemtype: itemtype.PluginFlyvemdmFleet, input: fleetToCreate })

            let itemsToAdd = { ...this.state.data.tasksNew }

            this.state.data.tasks.map(task => {
                // Check if the same Policy id is equal on object to remove
                return itemsToAdd[task['plugin_flyvemdm_policies_id']] ? delete itemsToAdd[task['plugin_flyvemdm_policies_id']] : null
            })

            let itemsToSave = []
            Object.values(itemsToAdd).forEach(item => {
                if (Array.isArray(item)) {
                    item.forEach(deploy => {
                        deploy['plugin_flyvemdm_fleets_id'] = newFleet['id']

                        try {
                            const objValue = JSON.parse(deploy['value'])
                            deploy['value'] = objValue
                        } catch (e) {}

                        itemsToSave.push(deploy)
                    })
                } else {
                    item['plugin_flyvemdm_fleets_id'] = newFleet['id']
                    itemsToSave.push(item)
                }
            })

            if (itemsToSave.length > 0) {
                await this.props.glpi.addItem({ itemtype: itemtype.PluginFlyvemdmTask, input: itemsToSave })
            }

            this.setState({
                isLoading: false
            })
            this.props.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.fleet_successfully_created'),
                type: 'success'
            })
            this.props.changeSelectionMode(false)
            this.props.changeAction('reload')
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({
                isLoading: false
            })
        }
    }

    handleDeleteFleet = async (eventObject) => {
        if (this.props.selectedItems.length === 1) {
            this.setState({
                isLoading: true
            })

            try {
                await this.props.glpi.deleteItem({
                    itemtype: itemtype.PluginFlyvemdmFleet,
                    id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id']
                })

                this.setState({
                    isLoading: false
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.fleet_successfully_removed'),
                    type: 'success'
                })
                this.props.changeSelectionMode(false)
                this.props.changeAction('reload')    

            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({
                    isLoading: false
                })
            }
        }
    }

    handleDuplicateFleet = () => {
        this.setState((prevState, props) => ({
            input: prevState.input !== '' ? prevState.input.concat(' copy') : 'Copy',
            data: {
                tasks: [],
                tasksNew: prevState.data.tasksNew,
                policies: prevState.data.policies,
                categories: prevState.data.categories,
                files: prevState.data.files,
                applications: prevState.data.applications,
                tasksRemove: {}
            }
        }), () => {
            this.handleCreateFleet()
        })
    }

    render() {
        let policiesPerCategory

        if (this.state.data.policies
        && this.state.data.categories
        && this.state.data.tasksNew
        && this.state.data.files
        && this.state.data.applications) {
            policiesPerCategory = this.filterPoliciesPerCategory()
        }         
        if (this.state.isLoading) {
            return (<Loading message={`${I18n.t('commons.loading')}...`} />)
        } else {
            return (
            <ContentPane>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{ display: '-moz-flex', flexDirection: 'row' }}>
                    <div className="contentHeader" style={{ display: 'table' }}>
                        <h1 className="win-h1 titleContentPane" style={{ display: 'table-cell', verticalAlign: 'middle', padding: '0 20px' }}>
                            <input
                                type="text"
                                className="win-textbox"
                                style={{ fontSize: '34px', fontWeight: '200' }}
                                placeholder={I18n.t('fleets.input_name')}
                                name="fleetName"
                                onChange={this.handleChangeInput}
                                value={this.state.input}
                            />
                        </h1>
                        <div className="itemInfo" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                            <div className="contentStatus">
                                <span
                                    className="saveIcon"
                                    style={{ padding: '10px', fontSize: '20px' }}
                                    onClick={this.handleSaveFleet}
                                />
                                <span
                                    className="copyIcon"
                                    style={{ padding: '10px', fontSize: '20px', display: this.props.selectedItems.length === 0 ? 'none' : '' }}
                                    onClick={this.handleDuplicateFleet}
                                />
                                <span
                                    className="deleteIcon"
                                    style={{ padding: '10px', fontSize: '20px', display: this.props.selectedItems.length === 0 ? 'none' : '' }}
                                    onClick={this.handleDeleteFleet}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: '-moz-flex', flexDirection: 'row' }}>
                    <div className="separator" style={{ width: '100%'}} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', overflowY: 'auto' }}>
                    <div className="contentInfo" style={{ padding: '10px', width: '100%' }} >
                        <h3 className="win-h3" >
                            {I18n.t('fleets.tasks_per_Category')}
                        </h3>
                        <div>
                            {policiesPerCategory ? (
                                policiesPerCategory.map((category) => {
                                    return category['policies'].length > 0
                                        ? (
                                            <div key={category['id']}>
                                                <h2>
                                                    {category['name']}
                                                </h2>
                                                <div>
                                                    {category['policies'].map((policy, index) => (
                                                        <FleetsTaskItemList
                                                            key={[policy['PluginFlyvemdmPolicy.name'], index].join("_")}
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
                                        : null
                                })
                            ) : this.state.notManaged ? <h1>{I18n.t('fleets.not_managed')}</h1> : <h1>{I18n.t('fleets.loading_tasks')}</h1>}
                        </div>
                    </div>
                </div>
                <Confirmation title={`Delete Fleets`} message={this.props.selectedItems.length + ` Fleets`} reference={el => this.contentDialog = el} />
                </div>
            </ContentPane>
            )
        }
    }
}

export default FleetsContent