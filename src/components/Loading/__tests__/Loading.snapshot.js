import React from 'react'
import renderer from 'react-test-renderer'

import Loading from "../index"

describe('Loading', () => {
    test('renders loading', () => {
        const component = renderer.create(
            <Loading />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('renders small loading', () => {
        const component = renderer.create(
            <Loading small />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})