import React, { Component } from 'react'

export default class DashboardPage extends Component {
    
    render() {
        return (
            <div className="info-box">
                <div>
                    <h1>
                        {this.props.count}
                    </h1>
                </div>
                <div className="title">
                    <h3>
                        {this.props.name}
                    </h3>
                </div>
                
            </div>
        )
    }
}
