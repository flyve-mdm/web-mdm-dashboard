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

import bytesToSize from '../index'

describe('bytesToSize', () => {
  it('should return "0 Bytes"', () => {
    expect(bytesToSize(0)).toEqual('0 Bytes')
  })

  it('should return "1 Bytes"', () => {
    expect(bytesToSize(1)).toEqual('1 Bytes')
  })

  it('should return "1 KB"', () => {
    expect(bytesToSize(1024)).toEqual('1 KB')
  })

  it('should return "1 MB"', () => {
    expect(bytesToSize(1048576)).toEqual('1 MB')
  })

  it('should return "1 GB"', () => {
    expect(bytesToSize(1073741824)).toEqual('1 GB')
  })

  it('should return "1 TB"', () => {
    expect(bytesToSize(1099511627776)).toEqual('1 TB')
  })
})
