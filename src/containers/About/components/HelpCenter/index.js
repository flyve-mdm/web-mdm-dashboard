import React, { Component } from "react"
import GenerateRoutes from '../../../../components/GenerateRoutes'
import routes from './routes'

class HelpCenter extends Component {
    render() {
        return (
            <div>                
                <h2>Help Center</h2>
                <div className="aboutPane">
                    <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
                </div>
            </div>
        )
    }
}

export default HelpCenter