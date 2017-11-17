import React, { Component } from "react"
import WinJS from 'winjs'
import AboutList from './AboutList'
import AboutPage from './AboutPage'
import './About.css'
export default class About extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List([
                { title: "Overview" },
                { title: "Help Center" },
                { title: "System information" },
                { title: "Contact" },
                { title: "Release notes" },
                { title: "Term of use" },
                { title: "License"}
            ]),
            isHelpCenter: false
        }
    }
        
    changeIsHelpCenter = () => {
        this.setState({
            isHelpCenter: !this.state.isHelpCenter,
            list: new WinJS.Binding.List([
                { title: "How to enroll a device" },
                { title: "How to add a fleet" }
            ])
        })
    }

    render() {
        let selectedIndex = this.props.location.index !== null ? this.props.location.index : null
        
        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <AboutList isHelpCenter={this.state.isHelpCenter} changeIsHelpCenter={this.changeIsHelpCenter} selectedIndex={selectedIndex} itemListPaneWidth="100%" itemList={this.state.list} location={this.props.location} onNavigate={this.props.onNavigate}/>
            } else {
                return <AboutPage isHelpCenter={this.state.isHelpCenter} selectedIndex={selectedIndex} itemList={this.state.list} itemListPaneWidth={0}/>
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <AboutList isHelpCenter={this.state.isHelpCenter} changeIsHelpCenter={this.changeIsHelpCenter} selectedIndex={selectedIndex} itemListPaneWidth={itemListPaneWidth} itemList={this.state.list} location={this.props.location} onNavigate={this.props.onNavigate}/>
                    <AboutPage isHelpCenter={this.state.isHelpCenter} selectedIndex={selectedIndex} itemList={this.state.list} itemListPaneWidth={itemListPaneWidth}/>
                </div>
            )
        }
    }
}