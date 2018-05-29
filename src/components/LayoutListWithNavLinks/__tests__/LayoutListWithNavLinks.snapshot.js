import React from 'react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import history from '../../../shared/history'

import LayoutListWithNavLinks from "../index"

describe('LayoutListWithNavLinks', () => {
    beforeAll(() => {
        global.Animation = class Animation {play=()=>{}}
        global.KeyframeEffect = class KeyframeEffect {}
    })
    
    afterAll(() => {
        global.Animation = undefined
        global.KeyframeEffect = undefined       
    })

    test('renders LayoutListWithNavLinks', () => {
        const component = renderer.create(
            <Router history={history}>
                <LayoutListWithNavLinks 
                    rootPath="test/"
                    history={history}
                    routes={[
                        {
                          path: '/',
                          name: 'test 1',
                          component: <ul/>,
                          exact: true
                        },
                        {
                          path: '/test',
                          name: 'test 2',
                          component: <ol/>,
                          exact: true
                        }
                    ]}
                >
                    <div/>
                </LayoutListWithNavLinks>
            </Router>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})