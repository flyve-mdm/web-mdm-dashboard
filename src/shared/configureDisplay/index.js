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

/** @module configureDisplay */

/** Set the cards to display on Home page */
export default () => {
  const currentDisplay = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
  const newtDisplay = {
    applicationsUploaded: currentDisplay.applicationsUploaded !== undefined ? currentDisplay.applicationsUploaded : true,
    devicesByOperatingSystemVersion: currentDisplay.devicesByOperatingSystemVersion !== undefined
      ? currentDisplay.devicesByOperatingSystemVersion : true,
    devicesByUsers: currentDisplay.devicesByUsers !== undefined ? currentDisplay.devicesByUsers : true,
    devicesCurrentlyManaged: currentDisplay.devicesCurrentlyManaged !== undefined ? currentDisplay.devicesCurrentlyManaged
      : true,
    filesUploaded: currentDisplay.filesUploaded !== undefined ? currentDisplay.filesUploaded : true,
    fleetsCurrentlyManaged: currentDisplay.fleetsCurrentlyManaged !== undefined ? currentDisplay.fleetsCurrentlyManaged
      : true,
    invitationsSent: currentDisplay.invitationsSent !== undefined ? currentDisplay.invitationsSent : true,
    numberUsers: currentDisplay.numberUsers !== undefined ? currentDisplay.numberUsers : true,
    pendingInvitations: currentDisplay.pendingInvitations !== undefined ? currentDisplay.pendingInvitations : true,
    animations: currentDisplay.animations !== undefined ? currentDisplay.animations : true,
  }
  if (currentDisplay !== newtDisplay) {
    localStorage.setItem('display', JSON.stringify(newtDisplay))
  }
  return (newtDisplay)
}
