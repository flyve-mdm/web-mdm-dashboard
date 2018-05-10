import React, { PureComponent } from 'react'
import ReactWinJS from 'react-winjs'
import TasksDeployAppList from './TasksDeployAppList'
import TasksRemoveAppList from './TasksRemoveAppList'
import TasksDeployFileList from './TaskDeployFileList'
import TasksRemoveFileList from './TasksRemoveFileList'
import { I18n } from 'react-i18nify'

class FleetsTaskItemList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fleetHaveTask: this.props.fleetHaveTask,
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

    static getDerivedStateFromProps(nextProps, prevState) {
        let input
        if (nextProps.data['PluginFlyvemdmPolicy.type'] === 'removeapp' ||
            nextProps.data['PluginFlyvemdmPolicy.type'] === 'removefile') {
            input = ''
        } else {
            input = nextProps.value ? nextProps.value : ''
        }

        if (nextProps.fleetHaveTask !== prevState.fleetHaveTask) {
            if(nextProps.fleetHaveTask) {
                return {
                    fleetHaveTask: nextProps.fleetHaveTask,
                    alreadyAdded: true,
                    active: true,
                    input: input
                }
            } else {
                return {
                    fleetHaveTask: nextProps.fleetHaveTask,
                    alreadyAdded: false,
                    active: false,
                    input: input
                }
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    componentDidMount = () => {
        this.updateState(this.props.fleetHaveTask)
        let input
        if (this.props.data['PluginFlyvemdmPolicy.type'] === 'removeapp' ||
            this.props.data['PluginFlyvemdmPolicy.type'] === 'removefile') {
            input = ''
        } else {
            input = this.props.value ? this.props.value : ''
        }
        this.setState({
            input
        })
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
                break
            case 'int':
            case 'deployapp':
            case 'removeapp':
            case 'deployfile':
            case 'removefile':
                if(this.state.input.trim()) {
                    this.props.updateValueTask(this.props.data, this.state.input)
                }
                break
            default:
                break
        }
    }

    handleChangeInput = (e) => {
        switch (this.props.data['PluginFlyvemdmPolicy.type']) {
            case 'deployapp':
            case 'deployfile':
            case 'dropdown':
                if(e.target.value.trim()) {
                    this.props.updateValueTask(this.props.data, e.target.value)
                }
                break
            default:
                this.setState({ input: e.target.value })
                break
        }
    }

    handleBlurInput = (e) => {
        this.handleActivePolicyToggle()
    }

    handleRemoveTask = (task) => {
        this.props.removeValueTask(this.props.data, task)
    }

    render() {
        if (this.props.data === undefined) {
            return (   
                <div className='files-list fleet-list' >
                    <div className='files-list__content'>
                        <div className='files-list__item'>
                            <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                <div className='files-list__content-text-primary'>
                                    {I18n.t('commons.not_available')}
                                </div>
                            </div>
                            <div className='files-list__item-content-secondary'>
                                <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch
                                        className="files-list__content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" 
                                    />
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
                if(typeof(value) !== "boolean") { value = true }
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`} >
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div
                                    className={`files-list__item-list-field files-list__checkbox ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}
                                    onClick={this.handleActivePolicyToggle}>
                                        {this.props.value === 1 ? 
                                            <span className='selectIcon'></span> :
                                            <span className='unselectIcon'></span> }
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary'>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch 
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "int":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
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
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch 
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "dropdown":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <select
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
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
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
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <select 
                                        name={this.props.data['PluginFlyvemdmPolicy.id']}
                                        value = {0} 
                                        onChange={this.handleChangeInput}>
                                            <option value={0}>
                                                {I18n.t('commons.select_an_application')}
                                            </option>
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
                                        <TasksDeployAppList 
                                        data={this.props.value}
                                        typeData={this.props.typeData}
                                        removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="files-list__content-text-primary"
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
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <input
                                            type="text"
                                            className="win-textbox"
                                            placeholder={I18n.t('commons.package_name')}
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.state.input}
                                            onChange={this.handleChangeInput}
                                        />
                                        <span
                                            className="addIcon"
                                            style={{ padding: '0 10px', fontSize: '18px' }}
                                            onClick={this.handleBlurInput}
                                        />
                                        <TasksRemoveAppList
                                            data={this.props.value}
                                            removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
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
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <select 
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={0}
                                            onChange={this.handleChangeInput}>
                                            <option value={0}>
                                                {I18n.t('commons.select_a_file')}
                                            </option>
                                            {
                                                this.props.typeData.map((value, index) =>
                                                    <option
                                                        key={`${value['id']}_${index}`}
                                                        value={value['id']}>
                                                        {value["name"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                        <TasksDeployFileList
                                            data={this.props.value}
                                            typeData={this.props.typeData}
                                            removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
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
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <input
                                            type="text"
                                            className="win-textbox"
                                            placeholder={I18n.t('files.input_name')}
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.state.input}
                                            onChange={this.handleChangeInput}
                                        />
                                        <span
                                            className="addIcon"
                                            style={{ padding: '0 10px', fontSize: '18px' }}
                                            onClick={this.handleBlurInput}
                                        />
                                        <TasksRemoveFileList
                                            data={this.props.value}
                                            removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
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
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {I18n.t('commons.not_available')}
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon'>
                                    <ReactWinJS.ToggleSwitch 
                                        className="files-list__content-text-primary"
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