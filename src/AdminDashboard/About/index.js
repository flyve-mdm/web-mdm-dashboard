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
                { title: "System information" },
                { title: "Help Center" },
                { title: "Contact" },
                { title: "Release notes" },
                { title: "Term of use" },
                { title: "License"}
            ])
        }

    }
        
    render() {
        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null
        
        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <AboutList itemListPaneWidth="100%" itemList={this.state.list} location={this.props.location} onNavigate={this.props.onNavigate}/>
            } else {
                return <AboutPage selectedIndex={selectedIndex} itemList={this.state.list} itemListPaneWidth={0}/>
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <AboutList itemListPaneWidth={itemListPaneWidth} itemList={this.state.list} location={this.props.location} onNavigate={this.props.onNavigate}/>
                    <AboutPage selectedIndex={selectedIndex} itemList={this.state.list} itemListPaneWidth={itemListPaneWidth}/>
                </div>
            )
        }
    }
}