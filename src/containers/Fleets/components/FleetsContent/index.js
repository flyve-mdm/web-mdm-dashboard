import React, { Component } from 'react'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'

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
            layout: { type: WinJS.UI.ListLayout }
        }
    }
    
    handleFleetHaveTask = policy => {
        let policyId = null
        const haveTask = this.props.data.tasksData.some((task) => {
            policyId = task['plugin_flyvemdm_policies_id']
            return policyId === policy['PluginFlyvemdmPolicy.id']
        });
        return haveTask
    }

    getDefaultValues = policyId => {
        // Check if the policy default value are applications, files or nothing 
        if (policyId === 14 || policyId === 15) {
            return this.props.data.applicationsData
        }
        else if (policyId === 16 || policyId === 17) {
            return this.props.data.filesData
        }
    }

    getValueOfTask = policy => {
        // Check if the current Fleet have a Task that have a relation with this Policy
        if (policy['fleetHaveTask']) {
            if (POLICIES_CAN_MULTIPLE_VALUE.includes(policy['PluginFlyvemdmPolicy.id'])) {
                // Return a Array with the multiples Tasks (values)
                return this.props.data.tasksData.filter(task => (	
                    task['plugin_flyvemdm_policies_id'] === policy['PluginFlyvemdmPolicy.id']	
                ))
            }
            else {
                // Return a Object that is the Task
                return this.props.data.tasksData.some(task => (	
                    task['plugin_flyvemdm_policies_id'] === policy['PluginFlyvemdmPolicy.id']	
                ))
            }
        } else {
            return null
        }
    }

    filterPoliciesPerCategory = () => {
        const policiesPerCategory = []

        this.props.data.policyCategoriesData.forEach(category => {
            let obj = {}
            let categoryCompleteName = category['PluginFlyvemdmPolicyCategory.completename']
            let policiesPerThisCategory = this.props.data.policiesData.filter(policy => {
                // Check if the current Fleet have a Task that have a relation with this Policy
                policy['fleetHaveTask'] = this.handleFleetHaveTask(policy) 
                // Check if the same Policy Category name is equal to the Category name
                return policy['PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename'] === categoryCompleteName
            })
            obj['name'] = categoryCompleteName
            obj['id'] = category['PluginFlyvemdmPolicyCategory.id']
            obj['policies'] = policiesPerThisCategory
            policiesPerCategory.push(obj)
        });

        return policiesPerCategory
    }

    componentDidMount = () => {
        !this.props.data.fleetSelected && this.props.history.push('/app/fleets')
        !this.props.data.fleetSelected || this.props.data.fetchTasks()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.fleetSelected !== this.props.data.fleetSelected && nextProps.data.fleetSelected !== null) {
            nextProps.data.fetchTasks()
        }
    }

    render() {
        let policiesPerCategory

        if (this.props.data.fleetSelected 
        &&  this.props.data.policyCategoriesData
        &&  this.props.data.tasksData
        &&  this.props.data.filesData
        &&  this.props.data.applicationsData) {
            policiesPerCategory = this.filterPoliciesPerCategory()
        } 

        return this.props.data.fleetSelected ? 
            ( 
                <div style={{width: 'calc(100% - 20px)'}}> 
                    <div className="contentHeader">
                        <h1 className="win-h1 titleContentPane"> Fleets </h1>
                        <div className="itemInfo">
                            <div className="contentStatus">
                                <div className="name">{this.props.data.fleetSelected["PluginFlyvemdmFleet.name"]}</div>
                                <br />
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={this.handleEdit} />
                                <span className="deleteIcon" onClick={this.handleDelete} />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="contentInfo" style={{ width: '100%', marginTop: '20px', marginBottom: '20px', display: 'inline-block' }} >
                        <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks per Category </h3>
                    </div>
                    <div className="separator" />
                    { policiesPerCategory ? (
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
            )
            : null
    }
}

export default FleetsContent