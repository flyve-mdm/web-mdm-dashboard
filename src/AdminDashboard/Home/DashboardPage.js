import React, { Component } from 'react'

export default class DashboardPage extends Component {
    
    render() {
        console.log(this.props)
        return (
            <div style={{ padding: '20px', display: 'inline-block', width: '100%', height: '100px' }}>
                <div>
                    <h1>
                        {this.props.count}
                    </h1>
                </div>
                <div>
                    <h3>
                        {this.props.name}
                    </h3>
                </div>
                
            </div>
        )
    }
}
