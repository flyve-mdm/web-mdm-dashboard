import React, { Component } from "react"
import WinJS from 'winjs'
import AboutList from './AboutList'
import AboutPage from './AboutPage'
import PropTypes from 'prop-types'
import './About.css'

class About extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List([
                { title: "Overview" },
                { title: "System information" },
                { title: "Help Center" },
                { title: "Contact" },
                { title: "Release notes" },
                { title: "Term of use" },
                { title: "License"}
            ])
        }
        
        this.props.changeLoading(false)        
    }
        
    render() {
        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null
        
        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <AboutList itemListPaneWidth="100%" itemList={this.state.list} location={this.props.location} onNavigate={this.props.onNavigate}/>
            } else {
                return (
                    <AboutPage 
                    selectedIndex={selectedIndex} 
                    itemList={this.state.list} 
                    itemListPaneWidth={0} 
                    sendFeedback={this.props.sendFeedback}
                    isLoading={this.props.isLoading}
                    isError={this.props.isError}/>
                )
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <AboutList itemListPaneWidth={itemListPaneWidth} itemList={this.state.list} location={this.props.location} onNavigate={this.props.onNavigate}/>
                    <AboutPage 
                    selectedIndex={selectedIndex} 
                    itemList={this.state.list} 
                    itemListPaneWidth={itemListPaneWidth} 
                    sendFeedback={this.props.sendFeedback}
                    isLoading={this.props.isLoading}
                    isError={this.props.isError}/>
                </div>
            )
        }
    }
}

About.propTypes = {
    sendFeedback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired       
}

export default About