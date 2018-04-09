import React, { Component } from "react"
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loading from '../../../../components/Loading'
import { uiSetNotification } from '../../../../store/ui/actions'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import ContentPane from '../../../../components/ContentPane'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}


class Feedback extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedbackSent: false,
            textarea: '',
            isLoading: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        // TODO: send feedback
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
        if(this.state.isLoading) {
            return <Loading message={I18n.t('commons.sending')} />
        } else if (this.state.feedbackSent) {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <h3>{I18n.t('about.help_center.thank_you')}</h3>
                        <p>{I18n.t('about.help_center.submission_received')}</p>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <ContentPane>
                    <h3>{I18n.t('about.help_center.feedback')}</h3>
                    <div className="feedback">
                        <form onSubmit={this.handleSubmit}>
                            <textarea
                                name="textarea"
                                ref={(input) => { this.textareaInput = input; }}
                                className="win-textbox feedback-textarea"
                                placeholder="Write a feedback!"
                                value={this.state.textarea}
                                onChange={(event) => this.setState({ textarea: event.target.value })}
                                required={true}
                            />
                            <button className="btn --primary" style={{float: 'right'}}>
                                {I18n.t('commons.send') }
                            </button>
                        </form>
                    </div>
                </ContentPane>
            )
        }
    }
}

Feedback.propTypes = {
    actions: PropTypes.object.isRequired
}

export default connect(
    null,
    mapDispatchToProps
)(withHandleMessages(Feedback))