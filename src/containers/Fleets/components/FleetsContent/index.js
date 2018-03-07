import React, { Component } from 'react'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import Confirmation from '../../../../components/Confirmation'

const POLICIES_CAN_MULTIPLE_VALUE = [
    14, // -> Deploy Application
    16, // -> Deploy File
]

class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            policiesPerCategory: null
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

    filterPoliciesPerCategory = () => {
        // policiesPerCategory
        this.props.data.policyCategoriesData.forEach(category => {
            let categoryCompleteName = category['PluginFlyvemdmPolicyCategory.completename']
            let policiesPerThisCategory = this.props.data.policiesData.filter(policy => (
                policy['PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename'] === categoryCompleteName
            ))
            console.log('[Politicas por categoria]', categoryCompleteName, policiesPerThisCategory)
        });
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
        if (this.props.data.fleetSelected 
        &&  this.props.data.policyCategoriesData
        &&  this.props.data.tasksData) {
            this.filterPoliciesPerCategory()
        } 

        let renderComponent

        if (this.props.data.policiesData && this.props.data.tasksData) {
            renderComponent = this.props.data.policiesData.map((item, index) => {
                let multiplesValues = null

                const addedPolicy = this.handleFleetHaveTask(item)

                const IdPolicy = item['PluginFlyvemdmPolicy.id']
                
                if (addedPolicy && POLICIES_CAN_MULTIPLE_VALUE.includes(IdPolicy)) {
                    multiplesValues = this.props.data.tasksData.filter(task => (
                        task['plugin_flyvemdm_policies_id'] === IdPolicy
                    ))
                }

                return (
                    <FleetsTaskItemList
                        key={[item['PluginFlyvemdmPolicy.name'], index].join("_")}
                        data={item} 
                        addedPolicy={addedPolicy}
                        multiplesValues={multiplesValues} />
                )
            })
        }

        return this.props.data.fleetSelected ? 
            ( 
                <div>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Fleets </h2>
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
                        <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks </h3>
                    </div>

                    { renderComponent }

                    <Confirmation title={`Delete Fleet`} message={this.props.data.fleetSelected["PluginFlyvemdmFleet.name"]} reference={el => this.contentDialog = el} />
                </div>
            )
            : null
    }
}

export default FleetsContent