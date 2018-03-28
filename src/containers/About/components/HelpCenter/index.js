import React, { Component } from "react"
import GenerateRoutes from '../../../../components/GenerateRoutes'
import routes from './routes'

class HelpCenter extends Component {
    render() {
        return (
            <div className="aboutPane">
                <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
            </div>
        )
    }
}

export default HelpCenter