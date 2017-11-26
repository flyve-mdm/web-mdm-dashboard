import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'

export default class FleetsTaskItemList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            toggleSelected: false
        }
    }

    handleToggle = () => {
        this.setState({ toggleSelected: !this.state.toggleSelected })
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
            console.log(this.props.data)
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