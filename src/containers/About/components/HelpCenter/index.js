import React, { Component } from "react"
import GenerateRoutes from '../../../../components/GenerateRoutes'
import routes from './routes'

class HelpCenter extends Component {
    render() {
        return (
            <React.Fragment>
                <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
            </React.Fragment>
            
        )
    }
}

export default HelpCenter