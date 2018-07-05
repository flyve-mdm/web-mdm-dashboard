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

/** @module animations WinJS */

/** Import dependencies */
import WinJS from 'winjs'

/**
 * Enable / Disable WinJS animations
 * @param {boolean} isAnimate
 */
export default function (isAnimate) {
  if (isAnimate) {
    WinJS.UI.enableAnimations()
  } else {
    WinJS.UI.disableAnimations()
  }
}

/** Get WinJS animations configuration from local store */
const animate = () => (
  localStorage.getItem('display')
    ? JSON.parse(localStorage.getItem('display')).animations
    : {}
)

/**
 * Execute animation expanded or contract splitview
 * @param {object} element
 * @param {boolean} expanded
 */
const splitview = (element, expanded) => {
  const animation = element.animate({
    width: expanded ? ['0px', '200px'] : ['200px', '0px'],
  }, 150)
  if (!animate()) animation.play = () => {}
  return animation
}

/** Export SplitView animation */
export {
  splitview,
}
