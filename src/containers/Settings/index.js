import React, { Component } from 'react';

import LayoutListWithNavLinks from '../../components/LayoutListWithNavLinks'
import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'

class Settings extends Component {
    render() {
        return (
            <LayoutListWithNavLinks routes={routes} rootPath={this.props.match.url}>
                <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
            </LayoutListWithNavLinks>
        )
    }
}

export default Settings;