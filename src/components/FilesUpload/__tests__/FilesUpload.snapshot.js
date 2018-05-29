import React from 'react'
import renderer from 'react-test-renderer'

import FilesUpload from "../FilesUpload"

describe('FilesUpload', () => {
    test('renders FilesUpload', () => {
        const component = renderer.create(
            <FilesUpload>
                <div/>
            </FilesUpload>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})