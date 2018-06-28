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
import {
  bindActionCreators,
} from 'redux'
import {
  connect,
} from 'react-redux'
import {
  I18n,
} from 'react-i18nify'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import {
  uiSetNotification,
} from '../../../../store/ui/actions'
import ContentPane from '../../../../components/ContentPane'
import itemtype from '../../../../shared/itemtype'
import getID from '../../../../shared/getID'

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch),
  }
  return {
    actions,
  }
}

/**
 * @class HelpCenterArticle
 */
class HelpCenterArticle extends PureComponent {
  constructor(props) {
    super(props)
    const { history } = this.props

    this.state = {
      article: undefined,
      id: getID(history.location.pathname, 4),
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    const {
      glpi,
      actions,
      handleMessage,
    } = this.props
    const { id } = this.state

    try {
      this.setState({
        article: await glpi.getAnItem({
          itemtype: itemtype.KnowbaseItem,
          id,
        }),
        isLoading: false,
      })
    } catch (error) {
      actions.setNotification(handleMessage({
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
    const {
      isLoading,
      article,
    } = this.state

    return (
      isLoading
        ? (
          <div style={{ height: '100%', marginTop: '-80px' }}>
            <Loading message={`${I18n.t('commons.loading')}...`} />
          </div>
        )
        : (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {article.name}
            </h2>
            <div className="date" style={{ margin: '10px' }}>
              {article.date}
            </div>
            <div
              style={{ margin: '10px' }}
              dangerouslySetInnerHTML={{ __html: this.htmlDecode(article.answer) }}
            />
          </ContentPane>
        )

    )
  }
}

/** HelpCenterArticle propTypes */
HelpCenterArticle.propTypes = {
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default connect(
  null,
  mapDispatchToProps,
)(withGLPI(withHandleMessages(HelpCenterArticle)))
