import React from 'react'
import HeaderAdminDashboard from './HeaderAdminDashboard'
import BodyAdminDashboard from './BodyAdminDashboard'
import PropTypes from 'prop-types'

class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            type: ''
        }
    }

    render () {
        return (
            <div style={{height: '100%'}}>
                <HeaderAdminDashboard history={this.props.history}/>
                <BodyAdminDashboard />
                {/* <ToastNotifications title={} body={} type={} /> */}
            </div>
        )
    }
}

App.propTypes = {
    history: PropTypes.object.isRequired
}

export default App