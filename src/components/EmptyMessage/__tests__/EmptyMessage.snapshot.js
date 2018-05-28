import React from 'react'
import renderer from 'react-test-renderer'

import EmptyMessage from "../index"

describe('EmptyMessage', () => {
    test('renders EmptyMessage', () => {
        const component = renderer.create(
            <EmptyMessage />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})