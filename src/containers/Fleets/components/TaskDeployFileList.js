import React, { PureComponent } from 'react'

class TasksDeployFileList extends PureComponent {

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
                        return item['items_id'] === value['id'] ?
                            <div className='files-list' style={{ width: '320px' }} key={value['id']}>
                                <div className='files-list__content'>
                                    <div className='files-list__item'>
                                        <div className='files-list__item-content-primary'>
                                            <div className='files-list__content-text-primary'>{value['name']}</div>
                                        </div>
                                        <div className='files-list__item-content-secondary'>
                                            <div className='files-list__item-icon'>
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

export default TasksDeployFileList