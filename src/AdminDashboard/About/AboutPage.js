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
import EmptyMessage from '../../Utils/EmptyMessage'
import HelpCenter from './HelpCenter'

class AboutPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            return (
                <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        } else {
            let selectedItemList = this.props.itemList.getAt(this.props.selectedIndex[0])
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
                case 'Help Center':
                    return (
                        <div className="contentPane listPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth), padding: 0 }}>
                            <HelpCenter 
                            sendFeedback={this.props.sendFeedback}
                            isLoading={this.props.isLoading}
                            isError={this.props.isError} />
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
    selectedIndex: PropTypes.array,
    itemList: PropTypes.object.isRequired,
    sendFeedback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired        
}

export default AboutPage