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
                applications: undefined
            }
        }
    }

    componentDidMount = () => {

        this.getPolicies()
        this.getTasks()
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
                forcedisplay: [1, 2, 3, 4, 6],
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
            subItemtype: 'PluginFlyvemdmTask',
            options: {
                uid_cols: true,
                forcedisplay: [1, 2, 3, 4, 6]
            }
        })
        this.setState((prevState, props) => ({
            data: { ...prevState.data, tasks: tasks }
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
        let policyId = null
        const haveTask = this.state.data.tasks.some((task) => {
            policyId = task['plugin_flyvemdm_policies_id']
            return policyId === policy['PluginFlyvemdmPolicy.id']
        })
        return haveTask
    }

    getDefaultValues = policyId => {
        // Check if the policy default value are applications, files or nothing 
        if (policyId === 14 || policyId === 15) {
            return this.state.data.applications
        }
        else if (policyId === 16 || policyId === 17) {
            return this.state.data.files
        }
    }

    getValueOfTask = policy => {
        // Check if the current Fleet have a Task that have a relation with this Policy
        if (policy['fleetHaveTask']) {
            if (POLICIES_CAN_MULTIPLE_VALUE.includes(policy['PluginFlyvemdmPolicy.id'])) {
                // Return a Array with the multiples Tasks (values)
                return this.state.data.tasks.filter(task => (	
                    task['plugin_flyvemdm_policies_id'] === policy['PluginFlyvemdmPolicy.id']	
                ))
            }
            else {
                // Return a Object that is the Task
                return this.state.data.tasks.some(task => (	
                    task['plugin_flyvemdm_policies_id'] === policy['PluginFlyvemdmPolicy.id']	
                ))
            }
        } else {
            return null
        }
    }

    filterPoliciesPerCategory = () => {
        const policiesPerCategory = []

        this.state.data.categories.forEach(category => {
            let obj = {}
            let categoryCompleteName = category['PluginFlyvemdmPolicyCategory.completename']
            let policiesPerThisCategory = this.state.data.policies.filter(policy => {
                // Check if the current Fleet have a Task that have a relation with this Policy
                policy['fleetHaveTask'] = this.handleFleetHaveTask(policy) 
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

    addTask = (policy, value) => {
        console.log(policy)
        console.log(value)
    }

    handleSaveFleet = () => {
        console.log('save')
    }

    handleDeleteFleet = () => {
        console.log('delete')
    }

    render() {
        let policiesPerCategory

        if (this.props.selectedItems.length === 1 
        && this.state.data.policies
        && this.state.data.categories
        && this.state.data.tasks
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
                                                            data={policy}
                                                            addedPolicy={policy['fleetHaveTask']}
                                                            value={this.getValueOfTask(policy)}
                                                            addTask={this.addTask}
                                                            defaultValues={
                                                                (POLICIES_CAN_MULTIPLE_VALUE.includes(policy['PluginFlyvemdmPolicy.id']))
                                                                    ? (this.getDefaultValues(policy['PluginFlyvemdmPolicy.id']))
                                                                    : null
                                                            } />
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