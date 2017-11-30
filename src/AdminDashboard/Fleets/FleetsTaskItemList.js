import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { Applications, Files } from '../Data'
export default class FleetsTaskItemList extends Component {

    render() {
        if(this.props.data === undefined) {
            return (   
                <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>not available</div>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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
                    <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>{this.props.data['PluginFlyvemdmPolicy.name']}</div>
                                    <ReactWinJS.ToggleSwitch 
                                    className="content-text-primary"
                                    checked={value}
                                    onChange={() => this.props.editPolicy(this.props.data['PluginFlyvemdmPolicy.id'], !value)}
                                    labelOn="On"
                                    labelOff="Off" />
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "int":
                return (
                    <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>{this.props.data['PluginFlyvemdmPolicy.name']}</div>
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
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "deployapp":
                return (
                    <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>{this.props.data['PluginFlyvemdmPolicy.name']}</div>
                                    <select className="win-dropdown">
                                        <option>Select an application</option>
                                        {
                                            Applications.map((value, index) =>
                                                <option key={index}>{value["PluginFlyvemdmPackage.alias"]}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "deployfile":
                return (
                    <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>{this.props.data['PluginFlyvemdmPolicy.name']}</div>
                                    <select className="win-dropdown">
                                        <option>Select a file</option>
                                        {
                                            Files.map((value, index) =>
                                                <option key={index}>{value["PluginFlyvemdmFile.name"]}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                default:
                return (
                    <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>not available</div>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={() => this.props.deletePolicy(this.props.data)}/>
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