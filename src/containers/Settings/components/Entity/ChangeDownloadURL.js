import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { I18n } from 'react-i18nify'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import itemtype from '../../../../shared/itemtype'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class ChangeDownloadURL extends PureComponent {

    constructor (props) {
        super (props)
        this.state = {
            downloadURL: this.props.downloadURL,
            isLoading: false
        }
    }

    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveURL = () => {
        this.setState({
            isLoading: true
        }, async () => {
            try {
                await this.props.glpi.updateItem({
                    itemtype: itemtype.PluginFlyvemdmEntityconfig,
                    input: [{
                        id: this.props.entityID,
                        download_url: this.state.downloadURL
                    }]
                })
                this.props.saveValues('downloadURL', this.state.downloadURL)
                this.props.changeMode('')
                this.props.actions.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.download_url_changed'),
                    type: 'success'
                })
            } catch (error) {
                this.props.actions.setNotification(this.props.handleMessage({ type: 'alert', message: error }))                
                this.setState({ isLoading: false })
            }
        })
    }

    render () {
        return this.state.isLoading ? <Loading message={`${I18n.t('commons.saving')}...`}/>:
            (    
                <ContentPane>
                    <div className="list-element">
                        {I18n.t('settings.entity.url')}
                        <div className="list-element__detail">
                            {I18n.t('settings.entity.file_extension')}
                        </div>
                    </div>
                    <div className="list-element">
                        <input 
                            type="text" 
                            className="win-textbox" 
                            name="downloadURL"
                            value={this.state.downloadURL}
                            onChange={this.changeState}
                        />
                    </div>
                    <button className="btn btn--secondary" style={{marginRight: 10}} onClick={() => this.props.changeMode("")}>
                        {I18n.t('commons.cancel')}
                    </button>
                    <button className="btnbtn--primary" onClick={this.saveURL}>
                        {I18n.t('commons.save')}
                    </button>
                </ContentPane>
            )
    }
}

ChangeDownloadURL.propTypes = {
    changeMode: PropTypes.func.isRequired,
    downloadURL: PropTypes.string.isRequired,
    saveValues: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired,
    entityID: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(ChangeDownloadURL)
