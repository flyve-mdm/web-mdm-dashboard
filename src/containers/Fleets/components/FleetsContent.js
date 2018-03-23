import React, { Component } from 'react'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import ContentPane from '../../../components/ContentPane'

const POLICIES_CAN_MULTIPLE_VALUE = [
    14, // -> Deploy Application
    15, // -> Remove Application
    16, // -> Deploy File
    17, // -> Remove File
]

class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
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

        this.getTasks()
        this.getPolicies()
        this.getPolicyCategories()
        this.getFile()
        this.getApplication()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedItems.length === 0) {
            this.props.history.push('/app/fleets')
        } 
    }

    getPolicies = async () => {
        const policies = await this.props.glpi.searchItems({
            itemtype: 'PluginFlyvemdmPolicy',
            options: {
                uid_cols: true,
                forcedisplay: [1, 2, 3, 4, 5, 6, 7, 8],
                range: '0-50' // Can more than 50 items
            }
        })
        this.setState((prevState, props) => ({
            data: { ...prevState.data, policies: policies.data }
        }))
    }

    getTasks = async () => {
        /*
         * Name, ID, Category ID, Policy ID
         * */
        const tasks = await this.props.glpi.getSubItems({
            itemtype: 'PluginFlyvemdmFleet',
            id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id'],
            subItemtype: 'PluginFlyvemdmTask'
        })

        const tasksNew = tasks.map((task) => {
            return {
                [task['plugin_flyvemdm_policies_id']]: {
                    plugin_flyvemdm_fleets_id: task['plugin_flyvemdm_fleets_id'],
                    plugin_flyvemdm_policies_id: task['plugin_flyvemdm_policies_id'],
                    value: task['value']
                }
            } 
        })

        this.setState((prevState, props) => ({
            data: { ...prevState.data, tasks, tasksNew:tasksNew[0] }
        }))
    }

    getPolicyCategories = async () => {
        /*
         * Name, ID
         * */
        const categories = await this.props.glpi.searchItems({
            itemtype: 'PluginFlyvemdmPolicyCategory',
            options: {
                uid_cols: true,
                forcedisplay: [1, 2]
            }
        })
        this.setState((prevState, props) => ({
            data: { ...prevState.data, categories: categories.data }
        }))
    }

    getFile = async () => {
        /* 
        * Id and Name of file
        */
        const files = await this.props.glpi.searchItems({
            itemtype: 'PluginFlyvemdmFile',
            options: {
                uid_cols: true,
                forcedisplay: [
                    1, 2, 3
                ],
                range: '0-50' // Can more than 50 items
            }
        })
        this.setState((prevState, props) => ({
            data: { ...prevState.data, files: files.data }
        }))
    }

    getApplication = async () => {
        /* 
        * Id and Alias
        */
        const applications = await this.props.glpi.searchItems({
            itemtype: 'PluginFlyvemdmPackage',
            options: {
                uid_cols: true,
                forcedisplay: [
                    1, 2, 3, 4, 5, 6
                ],
                range: '0-50' // Can more than 50 items
            }
        })
        this.setState((prevState, props) => ({
            data: { ...prevState.data, applications: applications.data }
        }))
    }
    
    handleFleetHaveTask = policy => {
        return this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? true : false
    }

    getTypeData = policy => {
        const policyId = policy['PluginFlyvemdmPolicy.id']
        const policyType = policy['PluginFlyvemdmPolicy.type']
        // Check if the policy default value are applications, files or other
        if ((POLICIES_CAN_MULTIPLE_VALUE.includes(policyId))) {
            if (policyId === 14 || policyId === 15) {
                return this.state.data.applications
            }
            else if (policyId === 16 || policyId === 17) {
                return this.state.data.files
            }
        } else {
            if (policyType === 'dropdown') {
                return Object.entries(JSON.parse(policy['PluginFlyvemdmPolicy.type_data']))
            } else {
                return JSON.parse(policy['PluginFlyvemdmPolicy.type_data'])
            }
        }
    }

    getValueOfTask = (policy, fleetHaveTask) => {
        // Check if the current Fleet have a Task that have a relation with this Policy
        if (fleetHaveTask) {
            // Return a Object that is the Task
            return this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']] ? this.state.data.tasksNew[policy['PluginFlyvemdmPolicy.id']]['value'] : policy['PluginFlyvemdmPolicy.recommended_value']
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
            let tasks = { ...this.state.data.tasksRemove }
            delete tasks[policy['PluginFlyvemdmPolicy.id']]

            let addPolicy = {
                plugin_flyvemdm_fleets_id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id'],
                plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                value: policy['PluginFlyvemdmPolicy.recommended_value']
            }

            this.setState((prevState, props) => ({
                data: { ...prevState.data, tasksNew: { ...prevState.data.tasksNew, [policy['PluginFlyvemdmPolicy.id']]: addPolicy }, tasksRemove: tasks }
            }))
        }
    }

    handleRemoveTask = (policy) => {
        if (policy) {
            let tasks = { ...this.state.data.tasksNew}
            delete tasks[policy['PluginFlyvemdmPolicy.id']]
            let removePolicy = {
                plugin_flyvemdm_fleets_id: this.props.selectedItems[0]['PluginFlyvemdmFleet.id'],
                plugin_flyvemdm_policies_id: policy['PluginFlyvemdmPolicy.id'],
                value: policy['PluginFlyvemdmPolicy.default_value']
            }
            
            this.setState((prevState, props) => ({
                data: { ...prevState.data, tasksNew: tasks, tasksRemove: { ...prevState.data.tasksRemove, [policy['PluginFlyvemdmPolicy.id']]: removePolicy } }
            }))
        }
    }

    handleUpdateValueTask = (policy, value) => {
        if (policy) {
            let newValue
            switch (policy['PluginFlyvemdmPolicy.type']) {
                case 'bool':
                    newValue = value ? 1 : 0
                    break
                default:
                    newValue = value
                    break
            }
            this.setState((prevState, props) => ({
                data: { 
                ...prevState.data, 
                tasksNew: { 
                    ...prevState.data.tasksNew, 
                    [policy['PluginFlyvemdmPolicy.id']]: { 
                        ...prevState.data.tasksNew[policy['PluginFlyvemdmPolicy.id']], 
                        value: newValue } 
                    } 
                }
            }))
        }
    }

    handleSaveFleet = async () => {

        const itemsToDelete = this.state.data.tasks.filter(task => {
            // Check if the same Policy id is equal on object to remove
            return this.state.data.tasksRemove[task['plugin_flyvemdm_policies_id']] ? true : false
        }).map((item) => {
            return {
                id: item["plugin_flyvemdm_policies_id"]
            }
        })
    }

    handleDeleteFleet = () => {
        console.log('delete')
    }

    render() {
        let policiesPerCategory

        if (this.props.selectedItems.length === 1 
        && this.state.data.policies
        && this.state.data.categories
        && this.state.data.tasksNew
        && this.state.data.files
        && this.state.data.applications) {
            policiesPerCategory = this.filterPoliciesPerCategory()
        }         

        return this.props.selectedItems.length === 1 ? 
            ( 
                <ContentPane>
                    <div className="contentHeader" style={{ display:'table'}}>
                        <h1 className="win-h1 titleContentPane" style={{ display: 'table-cell', verticalAlign: 'middle', padding:'0 20px'}}> {this.props.selectedItems[0]["PluginFlyvemdmFleet.name"]} </h1>
                        <div className="itemInfo" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                            <div className="contentStatus">
                                <span
                                    className="saveIcon"
                                    style={{ padding: '10px', fontSize: '20px' }}
                                    onClick={this.handleSaveFleet} />
                                <span
                                    className="deleteIcon"
                                    style={{ padding: '10px', fontSize: '20px' }}
                                    onClick={this.handleDeleteFleet} />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="contentInfo" style={{ padding: '20px' }} >
                        <h3 className="win-h3" > Tasks per Category </h3>
                        <div style={{ padding: '0 20px'}}>
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
                                                            typeData={this.getTypeData(policy)}
                                                         />
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                        : null
                                })
                            ) : <h1>Loading Tasks, Policies and Categories</h1>}
                        </div>
                    </div>
                </ContentPane>
            )
            : null
    }
}

export default FleetsContent