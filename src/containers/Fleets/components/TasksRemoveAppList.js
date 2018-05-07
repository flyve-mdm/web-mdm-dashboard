import React, { PureComponent } from 'react'

class TasksRemoveAppList extends PureComponent {

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
                this.props.data.map((item, index) => {
                    return (
                        <div className='files-list' style={{ width: '320px' }} key={[item['value'], index].join("_")}>
                            <div className='files-list-content'>
                                <div className='files-list-item'>
                                    <div className='item-content-primary'>
                                        <div className='content-text-primary'>{item['value']}</div>
                                    </div>
                                    <div className='item-content-secondary'>
                                        <div className='icon item-icon'>
                                            <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={this.handleRemove.bind(this, item)}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
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