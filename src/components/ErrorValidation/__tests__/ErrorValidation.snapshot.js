import React from 'react'
import renderer from 'react-test-renderer'

import ErrorValidation from "../index"

describe('ErrorValidation', () => {
    test('renders ErrorValidation', () => {
        const component = renderer.create(
            <ErrorValidation errors={['error 1', 'error 2']}/>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})