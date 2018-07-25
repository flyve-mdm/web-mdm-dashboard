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
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import getID from 'shared/getID'
import Loading from 'components/Loading'
import ContentPane from 'components/ContentPane'
import withGLPI from 'hoc/withGLPI'

/**
 * @class HelpCenterArticle
 */
class HelpCenterArticle extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      article: undefined,
      id: getID(this.props.history.location.pathname, 4),
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    try {
      const newState = {
        article: await this.props.glpi.getAnItem({
          itemtype: itemtype.KnowbaseItem,
          id: this.state.id,
        }),
        isLoading: false,
      }
      this.setState({ ...newState })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        isLoading: false,
      })
    }
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["htmlDecode"] }] */
  htmlDecode(input) {
    const e = document.createElement('div')
    e.innerHTML = input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  }

  render() {
    return (
      this.state.isLoading
        ? (
          <div style={{ height: '100%', marginTop: '-80px' }}>
            <Loading message={`${I18n.t('commons.loading')}...`} />
          </div>
        )
        : (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {this.state.article.name}
            </h2>
            <div className="date" style={{ margin: '10px' }}>
              {this.state.article.date}
            </div>
            <div
              style={{ margin: '10px' }}
              dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.state.article.answer) }}
            />
          </ContentPane>
        )

    )
  }
}

/** HelpCenterArticle propTypes */
HelpCenterArticle.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(HelpCenterArticle)
