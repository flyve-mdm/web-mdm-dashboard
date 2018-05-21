import React, { PureComponent } from "react"
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loading from '../../../../components/Loading'
import { uiSetNotification } from '../../../../store/ui/actions'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import ContentPane from '../../../../components/ContentPane'
import { TextArea } from  '../../../../components/Forms'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}


class Feedback extends PureComponent {
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

    changeMessage = (name, value) => {
        this.setState({
            [name]: value
        })
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
                <ContentPane className="feedback">
                    <h3>{I18n.t('about.help_center.feedback')}</h3>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <TextArea
                                name="textarea"
                                value={this.state.textarea}
                                function={this.changeMessage}
                                placeholder={I18n.t('about.help_center.write_feedback')}
                                required
                            />
                            <button className="btn btn--primary">
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