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
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../shared/i18n'
import Loading from '../../../../components/Loading'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import ContentPane from '../../../../components/ContentPane'
import {
  TextArea,
  Input,
} from '../../../../components/Forms'
import itemtype from '../../../../shared/itemtype'
import withGLPI from '../../../../hoc/withGLPI'

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
      isLoading: false,
    }
  }

  componentDidMount() {
    if (this.textareaInput) {
      this.textareaInput.focus()
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { glpi } = this.props
    const {
      subject,
      textarea,
    } = this.state

    this.setState({
      isLoading: true,
    }, async () => {
      const {
        active_profile: activeProfile,
      } = await glpi.getActiveProfile()
      let entityID
      if (Array.isArray(activeProfile.entities)) {
        entityID = activeProfile.entities[0].id
      } else {
        for (const key in activeProfile.entities) {
          if (Object.prototype.hasOwnProperty.call(activeProfile.entities, key)) {
            entityID = `${activeProfile.entities[key].id}`
          }
        }
      }

      let entityconfig = await glpi.getAnItem({
        itemtype: itemtype.PluginFlyvemdmEntityconfig,
        id: entityID,
      })

      if (Array.isArray(entityconfig)) entityconfig = { ...entityconfig[0] }

      const link = `mailto:${entityconfig.support_email}`
        + `?subject=${escape(subject)}`
        + `&body=${escape(textarea)}`

      if (process.env.NODE_ENV !== 'test') window.location.href = link

      setTimeout(() => {
        this.setState({
          feedbackSent: true,
          isLoading: false,
        })
      }, 2000)
    })
  }

  changeMessage = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      isLoading,
      feedbackSent,
      subject,
      textarea,
    } = this.state

    if (isLoading) {
      return (
        <Loading message={I18n.t('commons.sending')} />
      )
    } if (feedbackSent) {
      return (
        <React.Fragment>
          <div style={{ textAlign: 'center' }}>
            <h3>
              {I18n.t('about.help_center.thank_you')}
            </h3>
            <p>
              {I18n.t('about.help_center.submission_received')}
            </p>
          </div>
        </React.Fragment>
      )
    }
    return (
      <ContentPane className="feedback">
        <h3>
          {I18n.t('about.help_center.feedback')}
        </h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input
              label={I18n.t('commons.subject')}
              name="subject"
              value={subject}
              function={this.changeMessage}
              required
            />
            <TextArea
              label={I18n.t('commons.message')}
              name="textarea"
              value={textarea}
              function={this.changeMessage}
              placeholder={I18n.t('about.help_center.write_feedback')}
              required
            />
            <button
              className="btn btn--primary"
              type="button"
            >
              {I18n.t('commons.send') }
            </button>
          </form>
        </div>
      </ContentPane>
    )
  }
}

/** Feedback propTypes */
Feedback.propTypes = {
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(withHandleMessages(Feedback))
