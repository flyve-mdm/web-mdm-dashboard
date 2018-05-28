import React from 'react'
import renderer from 'react-test-renderer'

import Select from "../index"

describe('Select', () => {
    test('renders Select', () => {
        const component = renderer.create(
            <Select 
                name="test"
                label="test"
                value="test"
                function={() => {}}
                options={[
                    {name: 'test', value: 1234}, 
                    {name: 'test2', value: 5678}
                ]}
                required
            />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})