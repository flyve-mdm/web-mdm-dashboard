import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesUpload from '../Files/FilesUpload'
import FilesUploadItemList from './FilesUploadItemList'
import ContentPane from '../../Utils/ContentPane'

export default class FilesAdd extends Component {

    constructor (props) {
        super(props)
        this.state = {
          files: []
        }
      }
    
      onFilesChange = (files) => {
        this.setState({
          files
        }, () => {
        //   console.log(this.state.files)
        })
      }
    
      onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
      }
    
      filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
      }
    
      filesRemoveAll = () => {
        this.refs.files.removeFiles()
      }
    
      filesUpload = () => {
        const formData = new FormData()
        Object.keys(this.state.files).forEach((key) => {
          const file = this.state.files[key]
          formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
    
          let item = this.props.dataSource.itemList
          item.push(
              {
                  "PluginFlyvemdmFile.name": file.name,
                  "PluginFlyvemdmFile.id": 10,
                  "PluginFlyvemdmFile.filesize": file.filesize,
                  "PluginFlyvemdmFile.source": ""
              }
          )
          this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
          this.props.changeActionList(null)
        })



        
      }

  render() {
    return (
        <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
            <div className="contentHeader">
                <h2 className="win-h2 titleContentPane" > New File </h2>
            </div>
            <div style={{ padding: '10px' }}>
                <FilesUpload
                    ref='files'
                    className='files-dropzone'
                    onChange={this.onFilesChange}
                    onError={this.onFilesError}
                    maxFiles={1}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    Drop the file here or click to upload
            </FilesUpload>
                <div style={{ margin: '10px' }}>
                    <button className="win-button win-button-primary" onClick={this.filesUpload}>Save</button>
                    {
                        this.state.files.length > 0
                            ? <div>
                                {this.state.files.map((file) =>
                                    <FilesUploadItemList key={file.id} fileData={file} onRemove={this.filesRemoveOne.bind(this, file)} />
                                )}
                            </div>
                            : null
                    }
                </div>
            </div>
        </ContentPane>
        
    )
  }
}
FilesAdd.propTypes = {
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    changeActionList: PropTypes.func.isRequired
}