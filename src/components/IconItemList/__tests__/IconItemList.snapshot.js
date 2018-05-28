import React from 'react'
import renderer from 'react-test-renderer'

import IconItemList from "../index"

describe('IconItemList', () => {
    test('renders IconItemList', () => {
        const component = renderer.create(
            <IconItemList image="profile.png"/>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})