import React, { Component } from "react"
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

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
            <div>
                <h2 className="win-h2 titleContentPane" onClick={() =>this.props.changeSelectItem(null)}>
                    {'<'} Help Center
                </h2>

                {this.renderArticle()}

            </div>
        )
    }
}

HelpCenterArticle.propTypes = {
    articles: PropTypes.object.isRequired,
    itemSelected: PropTypes.object.isRequired,
    changeSelectItem: PropTypes.func.isRequired
}

export default HelpCenterArticle