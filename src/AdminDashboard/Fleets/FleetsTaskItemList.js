import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { Applications } from '../Data'
export default class FleetsTaskItemList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            toggleSelected: true,
            input: '',
            applications: null
        }
    }

    componentDidMount() {
        if(this.props.data !== undefined) {
            if (this.props.data['PluginFlyvemdmPolicy.type'] === "int") {
                this.setState({ input: this.props.data['PluginFlyvemdmPolicy.default_value'] })
            }
            if (this.props.data['PluginFlyvemdmPolicy.type'] === "deployapp") {
                this.setState({ applications: Applications })
            }
        }
    }

    handleToggle = () => {
        this.setState({ toggleSelected: !this.state.toggleSelected })
    }

    changeInput = (e) => {
        console.log(e.target)
        this.setState({[e.target.input]: e.target.value})
    }

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
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        } else {
            switch (this.props.data["PluginFlyvemdmPolicy.type"]) {
                
                case "bool":
                return (
                    <div className='files-list' >
                        <div className='files-list-content'>
                            <div className='files-list-item'>
                                <div className='item-content-primary'>
                                    <div className='content-text-primary'>{this.props.data['PluginFlyvemdmPolicy.name']}</div>
                                    <ReactWinJS.ToggleSwitch 
                                    className="content-text-primary"
                                    checked={this.state.toggleSelected}
                                    onChange={this.handleToggle}
                                    labelOn="On"
                                    labelOff="Off" />
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} ></span>
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
                                    className="win-textbox" 
                                    placeholder={this.props.data['PluginFlyvemdmPolicy.name']}
                                    name="input"
                                    value={this.state.input}
                                    onChange={this.changeInput}
                                    required
                                    />
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} ></span>
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
                                                <option>{value["PluginFlyvemdmPackage.alias"]}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='item-content-secondary'>
                                    <div className='icon item-icon'>
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} ></span>
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
                                        <span className='deleteIcon' style={{ fontSize: '18px' }} ></span>
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