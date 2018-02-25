import React, { Component } from 'react'

export default class FilesUploadItemList extends Component {
    render() {
        return (
            <div className='files-list' >
                <div className='files-list-content'>
                    <div className='files-list-item'>
                        <div className='icon item-icon'>
                            <span className='documentIcon'></span>
                        </div>
                        <div className='item-content-primary'>
                            <div className='content-text-primary'>{this.props.fileData.name}</div>
                            <div className='content-text-secondary'>{this.props.fileData.extension}</div>
                            <div className='content-text-secondary'>{this.props.fileData.sizeReadable}</div>
                        </div>
                        <div className='item-content-secondary'>
                            <div className='icon item-icon'>
                                <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={this.props.onRemove}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
