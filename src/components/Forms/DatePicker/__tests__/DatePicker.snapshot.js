import React from 'react'
import renderer from 'react-test-renderer'

import DatePicker from "../index"

describe('DatePicker', () => {
    test('renders DatePicker', () => {
        const component = renderer.create(
            <DatePicker 
                name="test"
                label="test"
                value={new Date('06-10-1997')}
                function={() => {}}
                required
            />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})