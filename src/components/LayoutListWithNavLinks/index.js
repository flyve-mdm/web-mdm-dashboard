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
import PropTypes from 'prop-types'
import {
  NavLink,
} from 'react-router-dom'
import I18n from '../../shared/i18n'
import getMode from '../../shared/getMode'
import calc100PercentMinus from '../../shared/calc100PercentMinus'
import {
  slideTop,
} from '../../shared/animations/index'

/**
 * List of nav links
 * @class ListWithNavLinks
 * @extends PureComponent
 */
class ListWithNavLinks extends PureComponent {
  /**
   * Change render of the menu according to the screen resolution
   * @function styleNav
   * @param {string} mode
   * @param {object} history
   */
  static styleNav(mode, history) {
    return (
      mode === 'small'
        ? history.location.pathname.split('/').length > 3 ? {
          display: 'none',
        } : {
          width: '100%',
        } : {}
    )
  }

  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      mode: getMode(),
      itemListPaneWidth: getMode() === 'small' ? '100%' : 320,
      styleNav: ListWithNavLinks.styleNav(getMode(), this.props.history),
    }

    window.addEventListener('resize', this.handleResize)
  }

  /**
   * Run the 'slideTop' animation
   * @function componentDidMount
   */
  componentDidMount() {
    slideTop(this.nav).play()
  }

  /**
   * Remove 'resize' event listener
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      styleNav: (
        getMode() === 'small' ? nextProps.history.location.pathname.split('/').length > 3 ? {
          display: 'none',
        } : {
          width: '100%',
        } : {}
      ),
    }
  }

  /**
   * Change state according to the resolution of the screen
   * @function handleResize
   */
  handleResize = () => {
    const nextMode = getMode()
    if (this.state.mode !== nextMode) {
      this.setState({
        mode: nextMode,
        itemListPaneWidth: nextMode === 'small' ? '100%' : 320,
        styleNav: this.styleNav(nextMode, this.props.history),
      })
    }
  }

  /**
   * Change render of the child according to the screen resolution
   * @function stylesArticle
   */
  stylesArticle() {
    const validWidth = this.state.itemListPaneWidth === '100%' ? 0 : this.state.itemListPaneWidth
    return ({
      width: calc100PercentMinus(validWidth),
      overflowY: 'auto',
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="flex-block flex-block--with-scroll flex-block--with-content-pane">
        <nav
          style={this.state.styleNav}
          className="flex-block__list navlinks"
          ref={(nav) => { this.nav = nav }}
        >
          <ul>
            {this.props.routes.map((route, i) => {
              if (route.path !== '/') {
                return (
                  <li key={`ListWithNavLinks-${i.toString()}`}>
                    <NavLink
                      exact
                      to={`${this.props.rootPath}${route.path}`}
                      activeClassName='--active'>
                      {I18n.t(route.name)}
                    </NavLink>
                  </li>
                )
              }
              return ''
            })}
          </ul>
        </nav>
        {
          (this.state.mode === 'small' && !this.state.styleNav.display)
            ? ''
            : (
              <div style={this.stylesArticle()}>
                {this.props.children}
              </div>
            )
        }
      </div>
    )
  }
}

ListWithNavLinks.propTypes = {
  routes: PropTypes.array.isRequired,
  rootPath: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  history: PropTypes.object.isRequired,
}

export default ListWithNavLinks
