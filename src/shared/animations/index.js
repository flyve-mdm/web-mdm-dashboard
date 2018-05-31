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

import { AnimateFrom } from '@microsoft/fast-animation'

const animate = () => localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')).animations : {}

const slideTop = element => {
    const animation = new AnimateFrom(element, { y: 20 }, { duration: 150 })
    if (!animate()) animation.play = () => {}
    return animation
}

const slideLeft = element => {
    const animation = new AnimateFrom(element, { x: 60 }, { duration: 100 })
    if (!animate()) animation.play = () => {}
    return animation
}

const slideRight = element => {
    const animation = new AnimateFrom(element, { x: -60 }, { duration: 100 })
    if (!animate()) animation.play = () => {}
    return animation
}

export {
    slideTop,
    slideLeft,
    slideRight
}