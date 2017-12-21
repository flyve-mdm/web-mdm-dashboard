import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
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
                        <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <div className="contentMarkdown aboutPane">
                                <ReactMarkdown source={LICENCE} />
                            </div>
                        </ContentPane>
                    )
                case 'Term of use':
                    return (
                         <TermsOfUse title={selectedItemList.title} itemListPaneWidth={this.props.itemListPaneWidth}/>
                    )
                case 'Release notes':
                    return (
                        <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                            <h2 className="win-h2 titleContentPane">{selectedItemList.title}</h2>
                            <div className="contentMarkdown aboutPane">
                                <ReactMarkdown source={CHANGELOG} />
                            </div>
                        </ContentPane>
                    )
                case 'System information':
                    return (
                        <SystemInformation title={selectedItemList.title} itemListPaneWidth={this.props.itemListPaneWidth}/>
                    )
                case 'Contact':
                    return (
                        <Contact title={selectedItemList.title} itemListPaneWidth={this.props.itemListPaneWidth}/>
                    )
                case 'Overview':
                    return (
                        <Overview title={selectedItemList.title} itemListPaneWidth={this.props.itemListPaneWidth}/>
                    )
                case 'Help Center':
                    return (
                        <HelpCenter 
                        title={selectedItemList.title} 
                        itemListPaneWidth={this.props.itemListPaneWidth}
                        sendFeedback={this.props.sendFeedback}
                        isLoading={this.props.isLoading}
                        isError={this.props.isError}/>
                    )
                default:
                    return (
                        <EmptyMessage 
                            message={ selectedItemList.title }
                            itemListPaneWidth={this.props.itemListPaneWidth} />
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