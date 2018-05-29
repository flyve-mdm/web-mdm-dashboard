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