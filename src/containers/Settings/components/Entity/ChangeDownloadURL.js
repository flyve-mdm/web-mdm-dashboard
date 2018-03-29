import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { I18n } from 'react-i18nify'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class ChangeDownloadURL extends Component {

    constructor (props) {
        super (props)
        this.state = {
            downloadURL: this.props.downloadURL
        }
    }

    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveURL = () => {
        this.props.saveValues('downloadURL', this.state.downloadURL)
        this.props.changeMode('')
        this.props.actions.setNotification({
            title: 'Successfully',
            body: 'The Download URL was changed',
            type: 'info'
        })
    }

    render () {
        return (    
            <div>
                <div className="listElement">
                    {I18n.t('settings.entity.url')}
                    <div className="detail">
                        {I18n.t('settings.entity.file_extension')}
                    </div>
                </div>
                <div className="listElement">
                    <input 
                        type="text" 
                        className="win-textbox" 
                        name="downloadURL"
                        value={this.state.downloadURL}
                        onChange={this.changeState}
                    />
                </div>
                <button className="btn --secondary" style={{marginRight: 10}} onClick={() => this.props.changeMode("")}>
                    {I18n.t('commons.cancel')}
                </button>
                <button className="btn --primary" onClick={this.saveURL}>
                    {I18n.t('commons.save')}
                </button>
            </div>
        )
    }
}

ChangeDownloadURL.propTypes = {
    changeMode: PropTypes.func.isRequired,
    downloadURL: PropTypes.string.isRequired,
    saveValues: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(ChangeDownloadURL)
