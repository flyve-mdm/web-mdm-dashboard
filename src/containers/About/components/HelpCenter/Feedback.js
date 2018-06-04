/*
*   Copyright © 2018 Teclib. All rights reserved.
*
*   This file is part of web-mdm-dashboard
*
* web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
* device management software.
*
* Flyve MDM is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* Flyve MDM is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* ------------------------------------------------------------------------------
* @author     Gianfranco Manganiello (gmanganiello@teclib.com)
* @author     Hector Rondon (hrondon@teclib.com)
* @copyright  Copyright © 2018 Teclib. All rights reserved.
* @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
* @link       https://github.com/flyve-mdm/web-mdm-dashboard
* @link       http://flyve.org/web-mdm-dashboard
* @link       https://flyve-mdm.com
* ------------------------------------------------------------------------------
*/

/** import dependencies */
import React, { PureComponent } from "react"
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loading from '../../../../components/Loading'
import { uiSetNotification } from '../../../../store/ui/actions'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import ContentPane from '../../../../components/ContentPane'
import { TextArea, Input } from  '../../../../components/Forms'
import itemtype from "../../../../shared/itemtype"
import withGLPI from '../../../../hoc/withGLPI'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

/**
 * @class Feedback
 */
class Feedback extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            feedbackSent: false,
            textarea: '',
            subject: I18n.t('about.help_center.feedback'),
            isLoading: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            isLoading: true
        }, async () => {
            const { active_profile } = await this.props.glpi.getActiveProfile()
            let entityID
            if (Array.isArray(active_profile.entities)) {
                entityID = active_profile.entities[0].id
            } else {
                for (const key in active_profile.entities) {
                    if (active_profile.entities.hasOwnProperty(key)) {
                        entityID = `${active_profile.entities[key].id}`
                    }
                }
            }

            let entityconfig = await this.props.glpi.getAnItem({
                itemtype: itemtype.PluginFlyvemdmEntityconfig,
                id: entityID
            })

            if (Array.isArray(entityconfig)) entityconfig = entityconfig[0]

            const link = `mailto:${entityconfig.support_email}`
                + `?subject=${escape(this.state.subject)}`
                + `&body=${escape(this.state.textarea)}`

            window.location.href = link
            setTimeout(() => {
                this.setState({
                    feedbackSent: true,
                    isLoading: false
                })
            }, 2000)
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
                            <Input
                                label={I18n.t('commons.subject')}
                                name="subject"
                                value={this.state.subject}
                                function={this.changeMessage}
                                required
                            />
                            <TextArea
                                label={I18n.t('commons.message')}
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

/** Feedback propTypes */
Feedback.propTypes = {
    actions: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default connect(
    null,
    mapDispatchToProps
)(withGLPI(withHandleMessages(Feedback)))