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

import React from 'react'
import IconItemList from "../index"

describe('IconItemList', () => {
  it('should call componentDidMount', () => {
    sinon.spy(IconItemList.prototype, 'componentDidMount')
    mount(
      <IconItemList image="profile.png"/>
    )
    expect(IconItemList.prototype.componentDidMount.calledOnce).toBeTruthy()
  })

  it('should get a local image', () => {
    const wrapper = mount(
      <IconItemList image="profile.png"/>
    )
    expect(wrapper.find('img').prop('src')).toEqual('profile.png')
  })

  it('should mount a base64 image', () => {
    const wrapper = mount(
      <IconItemList
        image="data:image/png;base64, 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"
        type="base64"
      />
    )
    expect(wrapper.find('img').prop('src')).toEqual(
      'data:image/png;base64, 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'
    )
  })
})
