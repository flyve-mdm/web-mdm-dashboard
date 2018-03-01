import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesUpload from '../Files/FilesUpload'
import FilesUploadItemList from '../Files/FilesUploadItemList'
import ContentPane from '../../Utils/ContentPane'
import Loading from '../../Utils/Loading'

export default class ApplicationsAdd extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: [],
            isLoading: false,
            input: ''
        }
    }

    changeInput = (e) => {
        this.setState({ input: e.target.value })
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

        try {
            const formData = new FormData()
            Object.keys(this.state.files).forEach(async (key) => {
                const file = this.state.files[key]
                formData.append("file", file)
                formData.append("uploadManifest", `{"input":{"name":"${file.name}","alias":"${this.state.input}"}}`)
                this.setState({
                    isLoading: true
                })
                await this.props.glpi.uploadFile({ itemtype: "PluginFlyvemdmPackage", input: formData })
                this.setState({
                    isLoading: false
                })
                this.props.showNotification('Success', 'Saved file')
                this.props.changeAction("Reload")
            })
        } catch (error) {
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <Loading message="Loading..." />
                </ContentPane>)
        } else {
            renderComponent = (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > New Application </h2>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <input
                            type="text"
                            style={{ width: '240px' }}
                            className="win-textbox"
                            placeholder="Application name"
                            name="input"
                            value={this.state.input}
                            onChange={this.changeInput}
                        />
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
        return renderComponent
    }
}
ApplicationsAdd.propTypes = {
    location: PropTypes.array.isRequired,
    changeAction: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}