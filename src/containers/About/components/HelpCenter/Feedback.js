import React, { Component } from "react"
import PropTypes from 'prop-types'
import { I18n } from "react-i18nify"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../../../../components/Loading'
import { fetchSendFeedback } from '../../../../store/authentication/actions'

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        fetchSendFeedback: bindActionCreators(fetchSendFeedback, dispatch)
    }
    return { actions }
}


class Feedback extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedbackSent: false,
            textarea: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.actions.fetchSendFeedback({
            userId: 1, // Mock ID
            text: this.state.textarea
        })
        this.setState({
            feedbackSent: true
        })
    }

    componentDidMount() {
        if (this.textareaInput) {
            this.textareaInput.focus()
        }        
    }
    
    render() {
        if(this.props.isLoading) {
            return <Loading message={I18n.t('commons.sending') } />
        } else if (this.state.feedbackSent) {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <h3>{I18n.t('about.help_center_STRINGS.thank_you!') }</h3>
                        <p>{I18n.t('about.help_center_STRINGS.your_submission_has_been_received') }</p>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h3>{I18n.t('about.help_center_STRINGS.feedback') }</h3>
                    <div className="feedback">
                        <form onSubmit={this.handleSubmit}>
                        <textarea
                        name="textarea"
                        ref={(input) => { this.textareaInput = input; }}
                        className="win-textbox feedback-textarea"
                        placeholder="Write a feedback!"
                        value={this.state.textarea}
                        onChange={(event) => this.setState({ textarea: event.target.value })}
                        required={true}/>
                            <button className="btn --primary" style={{float: 'right'}}>
                                {I18n.t('commons.send') }
                            </button>
                        </form>
                    </div>
                </React.Fragment>
            )
        }
    }
}

Feedback.propTypes = {
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback)