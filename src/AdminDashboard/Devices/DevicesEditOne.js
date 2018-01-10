import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'

export default class DevicesEditOne extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputName: '',
            inputFleet: ''
        }
    }

    componentDidMount() {
        let selectedItemList
        let selectedIndex = this.props.location.length === 2 ? this.props.location[1] : null
        if (selectedIndex !== null) {
            selectedItemList = this.props.dataSource.itemList.getAt(selectedIndex)
            this.setState({
                inputName: selectedItemList["PluginFlyvemdmAgent.Computer.User.realname"],
                inputFleet: selectedItemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"]
            })
        }
    }

    changeInput = (e) => {
        switch (e.target.name) {
            case 'inputName':
                this.setState({ inputName: e.target.value })
                break;

            case 'inputFleet':
                this.setState({ inputFleet: e.target.value })
                break;
    
            default:
                break;
        }
    }

    handleSaveOneDevices = () => {
        this.props.showNotification('Success', 'changes saved successfully')
        this.props.changeActionList(null)
    }

    render() {

        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > Edit Device</h2>
                    <button className="win-button win-button-primary" onClick={this.handleSaveOneDevices}>
                        Save
                    </button>
                </div>
                <div className="separator" />
                <div className='files-list' >
                    <div className='files-list-content'>
                        <div className='files-list-item'>
                            <div className='item-content-primary'>
                                <div>Device name</div>
                                <input
                                    type="text"
                                    style={{ width: '240px' }}
                                    className="win-textbox"
                                    placeholder="Device name"
                                    name="inputName"
                                    value={this.state.inputName}
                                    onChange={this.changeInput}
                                />
                            </div>
                        </div>
                        <div className='files-list-item'>
                            <div className='item-content-primary'>
                                <div>Fleet name</div>
                                <select 
                                className="win-textbox"
                                name="inputFleet"
                                >
                                    <option value="not managed fleet">not managed fleet</option>
                                </select>
                                <p>Changing the Fleet of the device has the immediate consequence of applying the Fleet's Configuration to the specific Device</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentPane>
        )
    }
}
DevicesEditOne.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}
