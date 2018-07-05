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
import HeaderBreadcrumb from "../index"

describe('HeaderBreadcrumb', () => {
  it('should create breadcrumb menu', () => {
    const wrapper = shallow(
      <HeaderBreadcrumb
        location={{pathname: '/app/devices/309'}}
        handleToggleExpand={()=>{}}
      />
    )
    expect(JSON.parse(JSON.stringify(wrapper.instance().breadcrumbs()))).toEqual([{"_owner": null, "_store": {}, "key": "/app/devices", "props": {"children": [{"_owner": null, "_store": {}, "key": null, "props": {"children": "/", "className": "header-breadcrumb-separator"}, "ref": null, "type": "span"}, {"_owner": null, "_store": {}, "key": null, "props": {"children": {"_owner": null, "_store": {},"key": null, "props": {"children": "Devices", "replace": false, "to": "/app/devices"}, "ref": null}}, "ref":null, "type": "span"}]}, "ref": null}, {"_owner": null, "_store": {}, "key": "/app/devices/309", "props": {"children": [{"_owner": null, "_store": {}, "key": null, "props": {"children": "/", "className": "header-breadcrumb-separator"}, "ref": null, "type": "span"}, {"_owner": null, "_store": {}, "key": null, "props": {"children": {"_owner": null, "_store": {}, "key": null, "props": {"children": "309", "replace": false, "to": "/app/devices/309"}, "ref": null}}, "ref": null, "type": "span"}]}, "ref": null}])
  })
})
