import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import LICENCE from './LICENCE.md'
import CHANGELOG from './CHANGELOG.md'
import ReactMarkdown from 'react-markdown'
import TermsOfUse from './TermsOfUse'
import SystemInformation from './SystemInformation'
import Overview from './Overview'
import Contact from './Contact'

export default class AboutPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            return (
                <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
            )
        } else {
            let selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
            switch (selectedItemList.title) {
                case 'License':
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <div className="contentMarkdown aboutPane">
                                <ReactMarkdown source={LICENCE} />
                            </div>
                        </div>
                    )
                case 'Term of use':
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <TermsOfUse />
                        </div>
                    )
                case 'Release notes':
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <div className="contentMarkdown aboutPane">
                                <ReactMarkdown source={CHANGELOG} />
                            </div>
                        </div>
                    )
                case 'System information':
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <SystemInformation />
                        </div>
                    )
                case 'Contact':
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <Contact />
                        </div>
                    )
                case 'Overview':
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <Overview />
                        </div>
                    )
                default:
                    return (
                        <div className="contentPane titleContentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <h1>{ selectedItemList.title }</h1>
                        </div>
                    )
            }
        }
    }
}
AboutPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.number,
    itemList: PropTypes.object.isRequired
}
