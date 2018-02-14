import React, { Component } from "react"
import PropTypes from 'prop-types'
import Loading from '../../../Utils/Loading'
import ContentPane from '../../../Utils/ContentPane'
import { I18n } from "react-i18nify";

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
            return <Loading message={I18n.t('commons.sending') } />
        } else if(this.state.feedbackSent) {
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                    <div className="listPane" style={{ padding: 0}}>
                        <h2 className="titleContentPane" onClick={() => this.props.changeSelectItem(null)}>
                            {'< ' + I18n.t('about.help_center') }
                        </h2>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <h3>{I18n.t('about.help_center_STRINGS.thank_you!') }</h3>
                            <p>{I18n.t('about.help_center_STRINGS.your_submission_has_been_received') }</p>
                        </div>
                    </div>
                </ContentPane>
            )
        } else {
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                    <h2 className="titleContentPane" onClick={() => this.props.changeSelectItem(null)}>
                    {'< ' + I18n.t('about.help_center') }
                    </h2>
                    <div style={{padding: '0 10px'}}>
                        <h3>{I18n.t('about.help_center_STRINGS.feedback') }</h3>
                        <div className="feedback">
                            <textarea className="win-textbox feedback-textarea"/>
                            <button className="win-button" style={{float: 'right'}} onClick={this.send}>
                                {I18n.t('commons.send') }
                            </button>
                        </div>
                    </div>
                </ContentPane>
            )
        }
    }
}

Feedback.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    changeSelectItem: PropTypes.func.isRequired,
    sendFeedback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired   
}

export default Feedback