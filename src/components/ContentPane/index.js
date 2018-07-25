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
  slideTop,
} from 'shared/animations/index'


/**
 * Wrapper component to add the CSS class "content-pane" and the animation "slideTop"
 * @class ContentPane
 * @extends PureComponent
 */
class ContentPane extends PureComponent {
  /**
   * Run the "slideTop" animation when the component is mounted
   * @function componentDidMount
   */
  componentDidMount() {
    this.forceAnimation()
  }

  /**
   * Run the "slideTop" animation
   * @function forceAnimation
   */
  forceAnimation() {
    slideTop(this.pane).play()
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div
        className={`content-pane ${this.props.className}`}
        ref={(pane) => { this.pane = pane }}
      >
        { this.props.children }
      </div>
    )
  }
}

ContentPane.defaultProps = {
  className: '',
}

ContentPane.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
}

export default ContentPane
