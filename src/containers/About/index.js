import React, { Component } from "react"
import LayoutListWithNavLinks from '../../components/LayoutListWithNavLinks'
import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'
import PropTypes from 'prop-types'

class About extends Component {
    render() {
        return (
            <LayoutListWithNavLinks routes={routes} rootPath={this.props.match.url}>
                <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
            </LayoutListWithNavLinks>
        )
    }
}

About.propTypes = {
    match: PropTypes.object.isRequired
}

export default About