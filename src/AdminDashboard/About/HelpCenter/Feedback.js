import React, { Component } from "react"
import PropTypes from 'prop-types'

class Feedback extends Component {
    render() {
        return (
            <div>
                <h2 className="win-h2 titleContentPane" onClick={() => this.props.changeSelectItem(null)}>
                    {'<'} Help Center
                </h2>
                <div style={{padding: '0 10px'}}>
                    <h3 className="win-h3">Feedback</h3>
                    <div className="feedback">
                        <textarea className="win-textbox feedback-textarea"/>
                        <button className="win-button" style={{float: 'right'}}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

Feedback.propTypes = {
    changeSelectItem: PropTypes.func.isRequired
}

export default Feedback