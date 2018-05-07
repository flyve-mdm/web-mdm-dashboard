import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FilesUpload, FilesUploadItemList } from '../../../components/FilesUpload'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'

export default class ApplicationsAdd extends PureComponent {

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
        this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error.message }))
    }

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    filesUpload = () => {
        const formData = new FormData()
        Object.keys(this.state.files).forEach(async (key) => {
            try {
                const file = this.state.files[key]
                formData.append("file", file)
                formData.append("uploadManifest", `{"input":{"name":"${file.name}","alias":"${this.state.input}"}}`)
                this.setState({
                    isLoading: true
                })
                await this.props.glpi.uploadFile({ itemtype: itemtype.PluginFlyvemdmPackage, input: formData })
                this.setState({
                    isLoading: false
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.saved_file'),
                    type: 'success'
                })
                this.props.changeAction('reload')
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({
                    isLoading: false
                })
            }
        })
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (<Loading message={`${I18n.t('commons.loading')}...`} />)
        } else {
            renderComponent = (
                <ContentPane>
                    <div className="content-header" style={{ margin: '0 10px' }}>
                    <div className="content-header">
                        <h2 className="content-header__title"> 
                            {I18n.t('applications.new')} 
                        </h2>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <input
                            type="text"
                            className="win-textbox"
                            placeholder={I18n.t('applications.name')}
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
                            {I18n.t('commons.drop_or_click_file')}
                        </FilesUpload>
                        <div style={{marginTop: 10}}>
                            <button className="btn btn--primary" onClick={this.filesUpload}>
                                {I18n.t('commons.save')}
                            </button>
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
                    </div>
                </ContentPane>
            )
        }
        return renderComponent
    }
}
ApplicationsAdd.propTypes = {
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}