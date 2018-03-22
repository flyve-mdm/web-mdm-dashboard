import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'

class FleetsTaskItemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alreadyAdded: null,
            active: null
        }
    }

    updateState = (fleetHaveTask) => {
        if (fleetHaveTask) { 
            this.setState({
                alreadyAdded: true,
                active: true
            })
        } else {
            this.setState({
                alreadyAdded: false,
                active: false
            })
        }
    }

    componentDidMount = () => {
        this.updateState(this.props.fleetHaveTask)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fleetHaveTask !== this.props.fleetHaveTask) {
            this.updateState(nextProps.fleetHaveTask)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps)        
        if ((nextState.alreadyAdded || (this.state.alreadyAdded !== nextState.alreadyAdded)) && this.state.alreadyAdded !== null) {

        }
    }
    
    handleAddedToggle = () => {
        this.setState((prevState) => {
            return {
                alreadyAdded: !prevState.alreadyAdded
            }
        }) 
        this.props.addTask(this.props.data)

    }

    handleActivePolicyToggle = () => {
        this.props.updateValueTask(this.props.data, !this.props.value)
        // this.setState((prevState) => {
        //     return {
        //         active: !prevState.active
        //     }
        // })
    }

    render() {
        if (this.props.data === undefined) {
            return (   
                <div className='files-list fleet-list' >
                    <div className='files-list-content'>
                        <div className='files-list-item'>
                            <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                <div className='content-text-primary'>not available</div>
                            </div>
                            <div className='item-content-secondary'>
                                <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            switch (this.props.data["PluginFlyvemdmPolicy.type"]) {
                case "bool":
                let value = this.props.data['PluginFlyvemdmPolicy.default_value']
                if(typeof(value) !== "boolean") {
                    value = true
                }
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`} >
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div
                                    className={`item-list-field checkbox ${this.state.alreadyAdded && 'active'}`}
                                    onClick={this.handleActivePolicyToggle}>
                                        {this.props.value === 1 ? 
                                            <span className='selectIcon'></span> :
                                            <span className='unselectIcon'></span> }
                                    </div>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "int":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <input 
                                        type="number"
                                        className="win-textbox" 
                                        placeholder={this.props.data['PluginFlyvemdmPolicy.name']}
                                        name={this.props.data['PluginFlyvemdmPolicy.id']}
                                        value={this.props.data['PluginFlyvemdmPolicy.default_value']}
                                        onChange={this.props.changeInput}
                                        required
                                        />
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "deployapp":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <select
                                        className="win-dropdown" 
                                        name={this.props.data['PluginFlyvemdmPolicy.id']} 
                                        value={this.props.data['PluginFlyvemdmPolicy.default_value']}
                                        onChange={this.props.changeInput}>
                                            <option>Select an application</option>
                                            {
                                                this.props.defaultValues.map((value, index) =>
                                                    <option
                                                    key={value['PluginFlyvemdmPackage.id']}
                                                    value={value["PluginFlyvemdmPackage.id"]}>
                                                        {value["PluginFlyvemdmPackage.alias"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "removeapp":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <select
                                        className="win-dropdown" 
                                        name={this.props.data['PluginFlyvemdmPolicy.id']} 
                                        value={this.props.data['PluginFlyvemdmPolicy.default_value']}
                                        onChange={this.props.changeInput}>
                                            <option>Select an application</option>
                                            {
                                                this.props.defaultValues.map((value, index) =>
                                                    <option
                                                    key={value['PluginFlyvemdmPackage.id']}
                                                    value={value["PluginFlyvemdmPackage.id"]}>
                                                        {value["PluginFlyvemdmPackage.alias"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "deployfile":
                return (
                    <div className='files-list fleet-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <select 
                                        className="win-dropdown" 
                                        name={this.props.data['PluginFlyvemdmPolicy.id']} 
                                        value={this.props.data['PluginFlyvemdmPolicy.default_value']}
                                        onChange={this.props.changeInput}>
                                            <option>Select a file</option>
                                            {
                                                this.props.defaultValues.map(value => 
                                                    <option
                                                    key={value['PluginFlyvemdmFile.id']}
                                                    value={value["PluginFlyvemdmFile.id"]}>
                                                        {value["PluginFlyvemdmFile.name"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "removefile":
                return (
                    <div className='files-list fleet-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <select 
                                        className="win-dropdown" 
                                        name={this.props.data['PluginFlyvemdmPolicy.id']} 
                                        value={this.props.data['PluginFlyvemdmPolicy.default_value']}
                                        onChange={this.props.changeInput}>
                                            <option>Select a file</option>
                                            {
                                                this.props.defaultValues.map(value => 
                                                    <option
                                                    key={value['PluginFlyvemdmFile.id']}
                                                    value={value["PluginFlyvemdmFile.id"]}>
                                                        {value["PluginFlyvemdmFile.name"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                default:
                return (
                    <div className='files-list fleet-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className={`item-content-primary ${this.state.alreadyAdded || 'deactive'}`}>
                                    <div className='content-text-primary'>Not available</div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon'>
                                    <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={false}
                                        disabled
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default FleetsTaskItemList