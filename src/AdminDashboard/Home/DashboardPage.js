import React, { Component } from 'react'

export default class DashboardPage extends Component {
    
    render() {
        return (

            <div className="info-box">
                <span className="content-box">
                    {this.props.count}
                </span>
                <span className={'icon-box ' + this.props.icon} />
                <span className="title-box">
                    { this.props.name.toUpperCase() }
                </span>
            </div>
        )
    }
}
