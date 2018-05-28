import React from 'react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import history from '../../../shared/history'

import HeaderBreadcrumb from "../index"

describe('HeaderBreadcrumb', () => {
    test('renders HeaderBreadcrumb', () => {
        const component = renderer.create(
            <Router history={history}>
                <HeaderBreadcrumb 
                    location={{pathname: '/app/devices/309'}}
                    handleToggleExpand={() => {}}
                />
            </Router>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})