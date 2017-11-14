import React from 'react'
import HeaderAdminDashboard from './HeaderAdminDashboard'
import BodyAdminDashboard from './BodyAdminDashboard'

export default class App extends React.Component {

    render () {
        return (
            <div style={{height: '100%'}}>
                <HeaderAdminDashboard />
                <BodyAdminDashboard />
            </div>
        )
    }
}