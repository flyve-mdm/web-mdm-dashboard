import React from 'react'
import renderer from 'react-test-renderer'

import FilesUploadItemList from "../FilesUploadItemList"

describe('FilesUploadItemList', () => {
    test('renders FilesUploadItemList', () => {
        const component = renderer.create(
            <FilesUploadItemList 
                fileData={{
                    name: 'test',
                    extension: 'png',
                    sizeReadable: '10 kb'
                }}
                onRemove={() => {}}
            />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})