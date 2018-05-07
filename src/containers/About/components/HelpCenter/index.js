import React, { PureComponent } from "react"
import GenerateRoutes from '../../../../components/GenerateRoutes'
import routes from './routes'

class HelpCenter extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
            </React.Fragment>
            
        )
    }
}

export default HelpCenter