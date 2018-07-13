/**
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

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["node", "panel"] }] */

import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'

/**
 * Component for the scroll sync of the side menu
 * @class ScrollSync
 * @extends PureComponent
 */
class ScrollSync extends PureComponent {
  /**
   * @name panels
   * @type {object}
   */
  panels = {}

  /**
   * Validate types of the props
   * @constant propTypes
   * @static
   * @type {object}
   */
  static propTypes = {
    children: PropTypes.element.isRequired,
    proportional: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
  }

  /**
   * @constant childContextTypes
   * @static
   * @type {object}
   */
  static childContextTypes = {
    registerPanel: PropTypes.func,
    unregisterPanel: PropTypes.func,
  }

  /**
   * Set default values for the props
   * @constant defaultProps
   * @static
   * @type {object}
   */
  static defaultProps = {
    proportional: true,
    vertical: true,
    horizontal: true,
  }

  /**
   * @function getChildContext
   * @return {object}
   */
  getChildContext() {
    return {
      registerPanel: this.registerPanel,
      unregisterPanel: this.unregisterPanel,
    }
  }

  /**
   * Register panel
   * @function registerPanel
   * @param {component} node
   * @param {string} group
   */
  registerPanel = (node, group) => {
    if (!this.panels[group]) {
      this.panels[group] = []
    }

    if (!this.findPanel(node, group)) {
      this.addEvents(node, group)
      this.panels[group].push(node)
    }
  }

  /**
   * Unregister panel
   * @function unregisterPanel
   * @param {component} node
   * @param {string} group
   */
  unregisterPanel = (node, group) => {
    if (this.findPanel(node, group)) {
      this.removeEvents(node)
      this.panels[group].splice(this.panels[group].indexOf(node), 1)
    }
  }

  /**
   * Add events of scroll
   * @function addEvents
   * @param {component} node
   * @param {string} group
   */
  addEvents = (node, group) => {
    node.onscroll = this.handlePanelScroll.bind(this, node, group)
  }

  /**
   * Remove events of scroll
   * @function removeEvents
   * @param {component} node
   */
  removeEvents = (node) => {
    node.onscroll = null
  }

  /**
   * Find a panel
   * @function findPanel
   * @param {component} node
   * @param {string} group
   * @return {(component|boolean)}
   */
  findPanel = (node, group) => {
    if (!this.panels[group]) {
      return false
    }

    return this.panels[group].find(panel => panel === node)
  }

  /**
   * Run requestAnimationFrame with 'syncScrollPositions'
   * @function handlePanelScroll
   * @param {component} node
   * @param {string} group
   */
  handlePanelScroll = (node, group) => {
    window.requestAnimationFrame(() => {
      this.syncScrollPositions(node, group)
    })
  }

  /**
   * Determines the position of the scroll in the side menu
   * @function handlePanelScroll
   * @param {object} scrolledPanel
   * @param {string} group
   */
  syncScrollPositions = (scrolledPanel, group) => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = scrolledPanel

    const scrollTopOffset = scrollHeight - clientHeight

    const scrollLeftOffset = scrollWidth - clientWidth

    this.panels[group].forEach((panel) => {
      // For all panels beside the currently scrolling one
      if (scrolledPanel !== panel) {
        // Remove event listeners from the node that we'll manipulate
        this.removeEvents(panel, group)
        // Calculate the actual panel height
        const panelHeight = panel.scrollHeight - clientHeight
        const panelWidth = panel.scrollWidth - clientWidth
        // Adjust the scrollTop position of it accordingly
        if (this.props.vertical && scrollTopOffset > 0) {
          panel.scrollTop = this.props.proportional ? (panelHeight * scrollTop) / scrollTopOffset : scrollTop
        }
        if (this.props.horizontal && scrollLeftOffset > 0) {
          panel.scrollLeft = this.props.proportional ? (panelWidth * scrollLeft) / scrollLeftOffset : scrollLeft
        }
        // Re-attach event listeners after we're done scrolling
        window.requestAnimationFrame(() => {
          this.addEvents(panel, group)
        })
      }
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return React.Children.only(this.props.children)
  }
}

export default ScrollSync
