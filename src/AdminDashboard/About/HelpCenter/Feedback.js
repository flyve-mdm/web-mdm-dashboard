import React, { Component } from "react"
import PropTypes from 'prop-types'
import Loading from '../../../Utils/Loading'

class Feedback extends Component {

    constructor(props) {
        super(props)

        this.state = {
            feedbackSent: false
        }
    }

    send = () => {
        this.props.sendFeedback()
        this.setState({
            feedbackSent: true
        })
        
    }
    
    render() {

        if(this.props.isLoading) {
            return <Loading message="Sending..." />
        } else if(this.state.feedbackSent) {
            return (
                <div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2 className="titleContentPane" onClick={() => this.props.changeSelectItem(null)}>
                        {'<'} Help Center
                    </h2>
                    <div style={{padding: '0 10px'}}>
                        <h3>Feedback</h3>
                        <div className="feedback">
                            <textarea className="win-textbox feedback-textarea"/>
                            <button className="win-button" style={{float: 'right'}} onClick={this.send}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

Feedback.propTypes = {
    changeSelectItem: PropTypes.func.isRequired,
    sendFeedback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired   
}

export default Feedback