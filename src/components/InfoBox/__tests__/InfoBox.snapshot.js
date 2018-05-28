import React from 'react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import history from '../../../shared/history'

import InfoBox from "../index"

describe('InfoBox', () => {
    test('renders InfoBox', () => {
        const component = renderer.create(
            <Router history={history}>
                <InfoBox 
                    name="test"
                    to="test/"
                    icon="filesIcon"
                    count={3}
                />
            </Router>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})