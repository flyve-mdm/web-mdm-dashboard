import React, { PureComponent } from 'react'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import Confirmation from '../../../components/Confirmation'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

class FleetsContent extends PureComponent {

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.selectedItems && (prevState.selectedItems !== nextProps.selectedItems)) {
            return {
                ...prevState,
                isLoading: true,
                input: nextProps.selectedItems.length === 1 ? nextProps.selectedItems[0]["PluginFlyvemdmFleet.name"] : 'New Feet',
                notManaged: nextProps.selectedItems.length === 1 ? nextProps.selectedItems[0]["PluginFlyvemdmFleet.is_default"] === 1 ? true : false : false,
                selectedItems: nextProps.selectedItems
            }
        }
        
        return null
    }

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            itemType: this.props.itemType,
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
                tasksRemove: {}
            },
            devices__length: 0
        }
        console.log(this.props.itemType)
    }

    componentDidMount = () => {
            if (!this.state.notManaged) {
                this.requestAllData()
            } else {
                this.resetData()
            }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.selectedItems && (prevState.selectedItems !== this.state.selectedItems)) {
            if (!this.state.notManaged) {
                this.requestAllData()
            } else {
                this.resetData()
            }
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
            },
            devices__length: 0
        })
    }

    requestAllData = async () => {
        /*
         * Get Devices 
         * */
        const devices = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmAgent,
            criteria: 
            [
                {
                    link: 'and',
                    field: 3,
                    searchtype: 'contains',
                    value: this.state.input
                }
            ]
        })

        /*
         * Get Policies 
         * */
        const countPolicies = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmPolicy,
            options: {
                uid_cols: true,
                range: '0-0'
            }
        })
        const policies = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmPolicy,
            options: {
                uid_cols: true,
                forcedisplay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                range: `0-${countPolicies.totalcount}`
            }
        })

        let tasks = []
        let tasksNew= {} 
        
        if (this.props.selectedItems.length > 0) {
        /*
         * Get Tasks 
         * */
            try {
                const countTasks = await this.props.glpi.searchItems({
                    itemtype: itemtype.PluginFlyvemdmTask,
                    options: {
                        uid_cols: true,
                        range: '0-0'
                    },
                    criteria:
                        [
                            {
                                link: 'and',
                                field: 9,
                                searchtype: 'equals',
                                value: this.state.itemType
                            },
                            {
                                link: 'and',
                                field: 10,
                                searchtype: 'equals',
                                value: this.props.selectedItems[0]['PluginFlyvemdmFleet.id']
                            }
                        ]
                })

                tasks = await this.props.glpi.searchItems({
                    itemtype: itemtype.PluginFlyvemdmTask,
                    options: {
                        uid_cols: true,
                        forcedisplay: [1, 2, 3, 5, 6, 7],
                        range: `0-${countTasks.totalcount}`
                    },
                    criteria:
                        [
                            {
                                link: 'and',
                                field: 9,
                                searchtype: 'equals',
                                value: this.state.itemType
                            },
                            {
                                link: 'and',
                                field: 10,
                                searchtype: 'equals',
                                value: this.props.selectedItems[0]['PluginFlyvemdmFleet.id']
                            }
                        ]
                })
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.props.changeSelectionMode(false)
                this.props.changeAction('reload')         
            }

            if (tasks.data) {
                tasks.data.forEach((task, index) => {

                    let taskDeploy = {
                        itemtype_applied: this.state.itemType,
                        items_id_applied: task['PluginFlyvemdmTask.items_id_applied'],
                        plugin_flyvemdm_policies_id: task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id'],
                        value: task['PluginFlyvemdmTask.value']
                    }

                    if (task['PluginFlyvemdmTask.itemtype']) {
                        taskDeploy['itemtype'] = task['PluginFlyvemdmTask.itemtype']
                    }
                    if (task['PluginFlyvemdmTask.items_id']) {
                        taskDeploy['items_id'] = task['PluginFlyvemdmTask.items_id']
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
        const countCategories = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmPolicyCategory,
            options: {
                uid_cols: true,
                range: '0-0'
            }
        })
        const categories = await this.props.glpi.searchItems({
            itemtype: itemtype.PluginFlyvemdmPolicyCategory,
            options: {
                uid_cols: true,
                forcedisplay: [1, 2],
                range: `0-${countCategories.totalcount}`
            }
        })

        /* 
        * Get files
        */
        const files = await this.props.glpi.getAllItems({
            itemtype: itemtype.PluginFlyvemdmFile
        })

        /* 
        * Get Applications
        */
        
        const applications = await this.props.glpi.getAllItems({ 
            itemtype: itemtype.PluginFlyvemdmPackage,
        })

        /* 
        * Update props
        */
        this.setState((prevState, props) => ({
            isLoading: false,
            data: {
                tasks: tasks.data ? tasks.data : [], 
                tasksNew: tasksNew,
                policies: policies.data ? policies.data : [],
                categories: categories.data ? categories.data : [], 
                files: files ? files : [], 
                applications: applications ? applications : [],
                tasksRemove: {}
            },
            devices__length: devices.totalcount
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
                    itemtype_applied: this.state.itemType,
                    items_id_applied: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
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
                        itemtype_applied: this.state.itemType,
                        items_id_applied: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
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
                        itemtype_applied: this.state.itemType,
                        items_id_applied: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
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
                        itemtype_applied: this.state.itemType,
                        items_id_applied: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
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
                        itemtype_applied: this.state.itemType,
                        items_id_applied: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
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
                itemtype_applied: this.state.itemType,
                items_id_applied: this.props.selectedItems.length === 1 ? this.props.selectedItems[0]['PluginFlyvemdmFleet.id'] : null,
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
                if (Array.isArray(this.state.data.tasksRemove[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']])) {
                    
                    const value = this.state.data.tasksRemove[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].filter(item => {
                        if (item['items_id']) {
                            return item['items_id'] === task['PluginFlyvemdmTask.items_id'] ? true : false
                        } else {
                            return item['value'] === task['PluginFlyvemdmTask.value'] ? true : false
                        }
                    })

                    return value.length > 0 ? true : false
                } else {
                    return this.state.data.tasksRemove[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] ? true : false
                }
                
            }).map((item) => {
                return {
                    id: item['PluginFlyvemdmTask.id']
                }
            })
        }
        let itemsToUpdate = []

        const specialPolicies = this.state.data.policies.filter(policy => {
            return policy['PluginFlyvemdmPolicy.type'] === 'deployapp' || policy['PluginFlyvemdmPolicy.type'] === 'removeapp' || policy['PluginFlyvemdmPolicy.type'] === 'deployfile' || policy['PluginFlyvemdmPolicy.type'] === 'removefile'
        })

        this.state.data.tasks.forEach(task => {

            if (this.state.data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']]) {
                let idDeployApp

                for (let element of specialPolicies) {
                    if (element['PluginFlyvemdmPolicy.id'] === task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']) {
                        idDeployApp = element['PluginFlyvemdmPolicy.id']
                        break
                    }
                }

                if (!idDeployApp) {
                    if (this.state.data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']]['value'] !== task['PluginFlyvemdmTask.value']) {
                        itemsToUpdate.push({
                            id: task['PluginFlyvemdmTask.id'],
                            value: this.state.data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']]['value']
                        })
                    }

                }
            }
        })
        let itemsToAdd = { ...this.state.data.tasksNew }

        this.state.data.tasks.forEach(task => {
            
            if (Array.isArray(itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']])) {
                this.state.data.tasksNew[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].forEach((item, index) => {
                    if (task['PluginFlyvemdmTask.items_id']) {
                        return item['items_id'] === task['PluginFlyvemdmTask.items_id'] ? itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].splice(index, 1) : null
                    } else {
                        return item['value'] === task['PluginFlyvemdmTask.value'] ? itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']].splice(index, 1) : null
                    }
                })
            } else {
                return itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] ? delete itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] : null
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
                return itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] ? delete itemsToAdd[task['PluginFlyvemdmTask.PluginFlyvemdmPolicy.id']] : null
            })

            let itemsToSave = []
            Object.values(itemsToAdd).forEach(item => {
                if (Array.isArray(item)) {
                    item.forEach(deploy => {
                        deploy['items_id_applied'] = newFleet['id']

                        try {
                            const objValue = JSON.parse(deploy['value'])
                            deploy['value'] = objValue
                        } catch (e) {}

                        itemsToSave.push(deploy)
                    })
                } else {
                    item['items_id_applied'] = newFleet['id']
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

    goToList = () => {
        this.props.history.push(`${publicURL}/app/fleets/${this.props.selectedItems[0]['PluginFlyvemdmFleet.id']}/list`)
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
                    <div className="fleets" style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <div style={{ display: '-moz-flex', flexDirection: 'row' }}>
                            <div className="content-header">
                                {
                                    this.state.itemType === itemtype.PluginFlyvemdmFleet ?
                                    (
                                        <React.Fragment>
                                            <h1 className="content-header__title">
                                                <input
                                                    type="text"
                                                    className="win-textbox"
                                                    placeholder={I18n.t('fleets.input_name')}
                                                    name="fleetName"
                                                    onChange={this.handleChangeInput}
                                                    value={this.state.input}
                                                />
                                            </h1>
                                            <div className="devices__length" onClick={this.goToList}>
                                                <div>
                                                    {this.state.devices__length}
                                                </div>
                                                <span className="deviceIcon" />
                                            </div>
                                        </React.Fragment>
                                    ) : ''
                                }
                                <div className="item-info">
                                    <span
                                        className="saveIcon"
                                        onClick={this.handleSaveFleet}
                                    />
                                    {
                                        this.props.selectedItems.length !== 0 && this.state.itemType === itemtype.PluginFlyvemdmFleet ? 
                                        (   
                                            <React.Fragment>
                                                <span
                                                    className="copyIcon"
                                                    onClick={this.handleDuplicateFleet}
                                                />
                                                <span
                                                    className="deleteIcon"
                                                    onClick={this.handleDeleteFleet}
                                                />
                                            </React.Fragment>
                                        ) : ''
                                    }

                                </div>
                                <div className="item-info" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                    <div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: '-moz-flex', flexDirection: 'row' }}>
                            <div className="separator" style={{ width: '100%'}} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', overflowY: 'auto' }}>
                            <div className="content-info" >
                                <h3 style={{ margin: '10px' }}>
                                    {I18n.t('fleets.tasks_per_Category')}
                                </h3>
                                <div>
                                    {policiesPerCategory ? (
                                        policiesPerCategory.map((category) => {
                                            return category['policies'].length > 0
                                                ? (
                                                    <div key={category['id']}>
                                                        <div className="title">
                                                            {category['name']}
                                                        </div>
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