import React, { Component } from "react"
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ContentPane from '../../../Utils/ContentPane'

class HelpCenterArticle extends Component {

    renderArticle = () => {
        let articleName
        this.props.articles.data.forEach(element => {
            if (element['HelpCenter.id'] === this.props.itemSelected) {
                articleName = element['HelpCenter.source']
            }
        })
        const article = require(`./${articleName}`)
        return (
            <div style={{padding: '0 10px'}}>
                <ReactMarkdown source={article}/>
            </div>
        )
    }

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="listPane" style={{ padding: 0 }}>
                    <h2 className="win-h2 titleContentPane" onClick={() =>this.props.changeSelectItem(null)}>
                        {'<'} Help Center
                    </h2>

                    {this.renderArticle()}
                </div>
            </ContentPane>
        )
    }
}

HelpCenterArticle.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    articles: PropTypes.object.isRequired,
    itemSelected: PropTypes.number.isRequired,
    changeSelectItem: PropTypes.func.isRequired
}

export default HelpCenterArticle