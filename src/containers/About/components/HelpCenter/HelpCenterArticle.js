import React from "react"
import ReactMarkdown from 'react-markdown'

import ArticleMock from './articles/article_1.md'

const HelpCenterArticle = (props) => {
    return (
        <div className="listPane" style={{ padding: 0 }}>
            <ReactMarkdown source={ArticleMock}/>
        </div>
    )
}

export default HelpCenterArticle