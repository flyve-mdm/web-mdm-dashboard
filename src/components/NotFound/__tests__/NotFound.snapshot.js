import React from 'react'
import renderer from 'react-test-renderer'

import NotFound from "../index"

describe('NotFound', () => {
    test('renders NotFound', () => {
        const component = renderer.create(
            <NotFound />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})