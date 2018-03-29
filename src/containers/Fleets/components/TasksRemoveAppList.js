import React, { Component } from 'react'

class TasksRemoveAppList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderElements: undefined
        }
    }

    componentDidMount() {
        this.refreshRender()
    }

    refreshRender = () => {
        return (
            Array.isArray(this.props.data) ?
                this.props.data.map(item => {
                    return this.props.typeData.map((value, index) => {
                        return item['value'] === value['package_name'] ?
                            <div className='files-list' style={{ width: '320px' }} key={value['id']}>
                                <div className='files-list-content'>
                                    <div className='files-list-item'>
                                        <div className='item-content-primary'>
                                            <div className='content-text-primary'>{value['alias']}</div>
                                            <div className='content-text-secondary'>{value['package_name']}</div>
                                        </div>
                                        <div className='item-content-secondary'>
                                            <div className='icon item-icon'>
                                                <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={this.handleRemove.bind(this, item)}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    })
                })
                : null
        )
    }

    handleRemove = (task) => {
        this.props.removeTask(task)
    }

    render() {
        return this.refreshRender()

    }
}

export default TasksRemoveAppList