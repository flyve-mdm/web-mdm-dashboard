import React from "react"
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const HelpCenterArticle = ({articles, itemSelected}) => {
    let articleName
    let articleContent

    articles.data.forEach(element => {
        if (element['HelpCenter.id'] === itemSelected) {
            articleName = element['HelpCenter.source']
        }
    })

    const article = require(`./${articleName}`)

    articleContent = (
        <div>
            <ReactMarkdown source={article}/>
        </div>
    )
    return (
        <div className="listPane" style={{ padding: 0 }}>
            { articleContent }
        </div>
    )
}

HelpCenterArticle.propTypes = {
    articles: PropTypes.object.isRequired,
    itemSelected: PropTypes.number.isRequired,
}

export default HelpCenterArticle