import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        this.props.showNotification('Success', 'download URL changed')
    }

    render () {
        return (    
            <div>
                <h2 className="win-h2"> Entity </h2>
                
                <div className="listElement">
                    URL of the application
                    <div className="detail">File extension as apk or upk</div>
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
                <button className="win-button" style={{marginRight: 10}} onClick={() => this.props.changeMode("")}>
                    Cancel
                </button>
                <button className="win-button" onClick={this.saveURL}>
                    Save
                </button>
            </div>
        )
    }
}

ChangeDownloadURL.propTypes = {
    changeMode: PropTypes.func.isRequired,
    downloadURL: PropTypes.string.isRequired,
    saveValues: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default ChangeDownloadURL