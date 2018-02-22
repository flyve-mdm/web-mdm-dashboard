import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { Applications, Files } from '../Data'

export default class FleetsTaskItemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alreadyAdded: false
        }
    }

    handleAddedToggle = () => {
        this.setState((prevState) => {
            return {
                alreadyAdded: !prevState.alreadyAdded
            }
        })
    }

    render() {
        if(this.props.data === undefined) {
            return (   
                <div className='files-list fleet-list'>
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary '>not available</div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                        <span className={this.state.alreadyAdded ? 'removeIcon': 'addIcon'} style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <ReactWinJS.ToggleSwitch 
                                        className="content-text-primary"
                                        checked={value}
                                        onChange={() => this.props.editPolicy(this.props.data['PluginFlyvemdmPolicy.id'], !value)}
                                        labelOn="On"
                                        labelOff="Off" />
                                    </div>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                        <span className={this.state.alreadyAdded ? 'removeIcon': 'addIcon'} style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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
                                <div className='item-content-primary '>
                                    <div className='content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`item-list-field ${this.state.alreadyAdded && 'active'}`} >
                                        <input 
                                        type="number"
                                        style={{ width: '80px'}}
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
                                        <span className={this.state.alreadyAdded ? 'removeIcon': 'addIcon'} style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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
                                <div className='item-content-primary '>
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
                                                Applications.map((value, index) =>
                                                    <option key={index} value={value["PluginFlyvemdmPackage.alias"]}>
                                                        {value["PluginFlyvemdmPackage.alias"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                        <span className={this.state.alreadyAdded ? 'removeIcon': 'addIcon'} style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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
                                <div className='item-content-primary '>
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
                                                Files.map((value, index) =>
                                                    <option key={index} value={value["PluginFlyvemdmFile.name"]}>
                                                        {value["PluginFlyvemdmFile.name"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                        <span className={this.state.alreadyAdded ? 'removeIcon': 'addIcon'} style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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
                                <div className='item-content-primary '>
                                    <div className='content-text-primary'>not available</div>
                                </div>
                                <div className='item-content-secondary '>
                                    <div className='icon item-icon' onClick={this.handleAddedToggle}>
                                        <span className={this.state.alreadyAdded ? 'removeIcon': 'addIcon'} style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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