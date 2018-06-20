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

/** @module BuildItemList */

/** Import dependencies */
import WinJS from 'winjs'
import {
  I18n
} from 'react-i18nify'

/**
 * Sort elements ascending / descending
 * @param {object} dataSource
 * @param {int} index
 */
export default function (dataSource, index = 0) {
  const groupKey = function (data) {
    try {
      return (data[Object.keys(data)[index]])[0].toUpperCase()
    } catch (error) {
      return (I18n.t('commons.n/a'))
    }
  }

  const groupData = function (data) {
    return {
      title: groupKey(data)
    }
  }

  const groupSorted = function (a, b) {
    if (dataSource.order === 'ASC') {
      if (a < b) {
        return -1
      } else if (a > b) {
        return 1
      } else {
        return 0
      }
    } else {
      if (a > b) {
        return -1
      } else if (a < b) {
        return 1
      } else {
        return 0
      }
    }
  }

  const sorter = (a, b) => {
    if (a[Object.keys(a)[0]] < b[Object.keys(b)[0]]) {
      return -1
    } else if (a[Object.keys(a)[0]] > b[Object.keys(b)[0]]) {
      return 1
    } else {
      return 0
    }
  }

  if (dataSource.data) {
    return new WinJS.Binding.List(dataSource.data)
      .createSorted(sorter)
      .createGrouped(groupKey, groupData, groupSorted)
  }
}
