import React, { Component } from 'react'
import FilesUpload from '../Files/FilesUpload'


export default class ApplicationsAdd extends Component {

    constructor(props) {
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

            let item = this.props.itemList
            item.push(
                {
                    "PluginFlyvemdmPackage.name": file.type,
                    "PluginFlyvemdmPackage.id": 10,
                    "PluginFlyvemdmPackage.alias": file.name,
                    "PluginFlyvemdmPackage.version": 1,
                    "PluginFlyvemdmPackage.icon": "",
                    "PluginFlyvemdmPackage.filesize": file.filesize
                }
            )
            this.props.changeItemList(this.props.location, { itemList: item, sort: true })
            this.props.changeActionList(null)
        })
    }

    render() {
        return (
            <div style={{ padding: '10px' }}>
                <FilesUpload
                    ref='files'
                    className='files-dropzone'
                    style={{ height: '100px', width: '320px' }}
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
                    <button className="win-button" onClick={this.filesUpload}>Save</button>
                    {
                        this.state.files.length > 0
                            ? <div>
                                <ul>{this.state.files.map((file) =>
                                    <li key={file.id}>
                                        <div>
                                            <div>
                                                <div>{file.extension}</div>
                                            </div>
                                            <div>
                                                <div>{file.name}</div>
                                                <div>{file.sizeReadable}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <span
                                                id={file.id}
                                                className='deleteIcon'
                                                onClick={this.filesRemoveOne.bind(this, file)}
                                            />
                                        </div>
                                    </li>
                                )}</ul>
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}
