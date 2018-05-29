import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FilesUploadItemList extends PureComponent {
    render() {
        return (
            <div className='files-list' >
                <div className='files-list__content'>
                    <div className='files-list__item'>
                        <div className='icon files-list__item-icon'>
                            <span className='documentIcon'></span>
                        </div>
                        <div className='files-list__item-content-primary'>
                            <div className='files-list__content-text-primary'>{this.props.fileData.name}</div>
                            <div className='files-list__content-text-secondary'>{this.props.fileData.extension}</div>
                            <div className='files-list__content-text-secondary'>{this.props.fileData.sizeReadable}</div>
                        </div>
                        <div className='files-list__item-content-secondary'>
                            <div className='icon files-list__item-icon'>
                                <span className='deleteIcon' style={{ fontSize: '18px' }} onClick={this.props.onRemove}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FilesUploadItemList.propTypes = {
    fileData: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default FilesUploadItemList