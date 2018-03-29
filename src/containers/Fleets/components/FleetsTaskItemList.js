import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import TasksList from './TasksList'

class FleetsTaskItemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alreadyAdded: false,
            active: false,
            input:''
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
                active: false,
                input: ''
            })
        }
    }

    componentDidMount = () => {
        this.updateState(this.props.fleetHaveTask)
        this.setState({
            input: this.props.value ? this.props.value : ''
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fleetHaveTask !== this.props.fleetHaveTask) {
            this.updateState(nextProps.fleetHaveTask)
            this.setState({
                input: this.props.value ? this.props.value : ''
            })
        } else {
            this.setState({
                input: this.props.value ? this.props.value : ''
            })
        }

    }

    componentWillUpdate(nextProps, nextState) {
    
    }
    
    handleAddedToggle = () => {
        if (!this.state.alreadyAdded) {
            this.props.addTask(this.props.data)
        } else {
            this.props.removeTask(this.props.data)
        }
        this.setState((prevState) => {
            return {
                alreadyAdded: !prevState.alreadyAdded
            }
        }) 
    }

    handleActivePolicyToggle = () => {
        switch (this.props.data['PluginFlyvemdmPolicy.type']) {
            case 'bool':
                this.props.updateValueTask(this.props.data, !this.props.value)
                break;
            case 'int':
                this.props.updateValueTask(this.props.data, this.state.input)
                break;
            case 'deployapp':
                this.props.updateValueTask(this.props.data, this.state.input)
                break;
            case 'removeapp':
                this.props.updateValueTask(this.props.data, this.state.input)
                break;
            default:
                break;
        }
    }

    handleChangeInput = (e) => {
        if (this.props.data['PluginFlyvemdmPolicy.type'] !== 'deployapp') {
            this.setState({ input: e.target.value })
        } else {
            this.props.updateValueTask(this.props.data, e.target.value)
        }
    }

    handleBlurInput = (e) => {
        this.handleActivePolicyToggle()
    }

    handleRemoveTask = (task) => {
        this.props.removeValueTask(task)
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
                                        value={this.state.input}
                                        onChange={this.handleChangeInput}
                                        onBlur={this.handleBlurInput}
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
                case "dropdown":
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
                                            value={this.props.value}
                                            onChange={this.handleChangeInput}>
                                            {
                                                this.props.typeData.map((value, index) =>
                                                    <option 
                                                        key={value[0]}
                                                        value={value[0]}>
                                                        {value[1]}
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
                                        onChange={this.handleChangeInput}>
                                            <option>Select an application</option>
                                            {
                                                this.props.typeData.map((value, index) =>
                                                    <option
                                                        key={`${value['id']}_${index}`}
                                                        value={value['id']}>
                                                        {value["alias"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                        <TasksList 
                                        data={this.props.value}
                                        typeData={this.props.typeData}
                                        removeTask={this.handleRemoveTask}
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
                                        <input
                                            type="text"
                                            className="win-textbox"
                                            style={{ maxWidth: '368px'}}
                                            placeholder="Package name"
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.state.input}
                                            onChange={this.handleChangeInput}
                                            onBlur={this.handleBlurInput}
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
                                                this.props.typeData.map(value => 
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
                                                this.props.typeData.map(value => 
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