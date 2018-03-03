import React, { Component } from "react"

import Title from '../../../../components/Title'
import GenerateRoutes from '../../../../components/GenerateRoutes'
import routes from './routes'

class HelpCenter extends Component {
    render() {
        return (
            <div>                
                <Title text="Help Center"/>
                <div className="aboutPane">
                    <GenerateRoutes routes={routes} rootPath={this.props.match.url}/>
                </div>
            </div>
        )
    }
}

export default HelpCenter