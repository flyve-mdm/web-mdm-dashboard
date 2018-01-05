import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DashboardPage extends Component {

    handleLocation = () => {
        let index = this.props.routers.findIndex(obj => obj.label===this.props.name)
        this.props.onNavigate([this.props.name])
        this.props.changeIndex(index)
    }
    
    render() {
        return (

            <div className="info-box" onClick={this.handleLocation}>
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
DashboardPage.propTypes = {
    name: PropTypes.string.isRequired,
    routers: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeIndex: PropTypes.func.isRequired,
}