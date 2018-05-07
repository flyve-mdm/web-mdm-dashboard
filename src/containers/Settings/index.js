import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import LayoutListWithNavLinks from '../../components/LayoutListWithNavLinks'
import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'

class Settings extends PureComponent {
    render() {
        return (
            <LayoutListWithNavLinks routes={routes} rootPath={this.props.match.url} history={this.props.history}>
                <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
            </LayoutListWithNavLinks>
        )
    }
}

Settings.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Settings