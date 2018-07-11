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

import {
  PureComponent,
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/**
 * Component for the scroll sync of the side menu panel
 * @class ScrollSyncPanel
 * @extends PureComponent
 */
class ScrollSyncPanel extends PureComponent {
  /**
   * @static
   * @constant propTypes
   * @type {object}
   */
  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.object,
    group: PropTypes.string,
  }

  /**
   * @static
   * @constant defaultProps
   * @type {object}
   */
  static defaultProps = {
    group: 'default',
  }

  /**
   * @static
   * @constant contextTypes
   * @type {object}
   */
  static contextTypes = {
    registerPanel: PropTypes.func.isRequired,
    unregisterPanel: PropTypes.func.isRequired,
  }

  /**
   * Register panel
   * @function componentDidMount
   */
  componentDidMount() {
    this.node = this.props.attachTo || ReactDOM.findDOMNode(this)
    this.context.registerPanel(this.node, this.props.group)
  }

  /**
   * Unregister old panel and register the new
   * @function componentDidUpdate
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.group !== prevProps.group) {
      this.context.unregisterPanel(this.node, prevProps.group)
      this.context.registerPanel(this.node, this.props.group)
    }
  }

  /**
   * Unregister the panel
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    this.context.unregisterPanel(this.node, this.props.group)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return this.props.children
  }
}

export default ScrollSyncPanel
