import React from 'react'
import renderer from 'react-test-renderer'

import TextArea from "../index"

describe('TextArea', () => {
    test('renders TextArea', () => {
        const component = renderer.create(
            <TextArea 
                name="test"
                label="test"
                value="test"
                placeholder="test"
                rows={8}
                function={() => {}}
                style={{height: '40px'}}
                required
            />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})