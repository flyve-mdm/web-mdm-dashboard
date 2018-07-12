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

import React, {
  PureComponent,
} from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import I18n from '../../../../shared/i18n'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import EmptyMessage from '../../../../components/EmptyMessage'

/**
 * Component to show the release notes
 * @class ReleaseNotes
 * @extends PureComponent
 */
class ReleaseNotes extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      release: undefined,
    }
  }

  /**
   * Get release notes
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/flyve-mdm/web-mdm-dashboard/gh-pages/CHANGELOG.md',
      )
      this.setState({
        release: await response.text(),
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        release: 'no data',
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const { release } = this.state

    let renderComponent
    if (release) {
      if (release === 'no data') {
        renderComponent = (
          <EmptyMessage message={I18n.t('commons.no_data')} />
        )
      } else {
        renderComponent = (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('about.release_notes.title')}
            </h2>
            <div className="about-pane" style={{ margin: '10px' }}>
              <ReactMarkdown source={release} />
            </div>
          </ContentPane>
        )
      }
    } else {
      renderComponent = (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    }

    return renderComponent
  }
}

/** ReleaseNotes propsTypes */
ReleaseNotes.propTypes = {
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default ReleaseNotes
