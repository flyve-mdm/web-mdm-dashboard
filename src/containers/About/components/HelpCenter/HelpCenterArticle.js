import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

class HelpCenterArticle extends Component {
    render () {
        const article = require(`./articles/${this.props.history.location.pathname.split("/help/")[1]}.md`)
        return (
            <div className="listPane" style={{ padding: 0 }}>
                <ReactMarkdown source={article}/>
            </div>
        ) 
    }
}

HelpCenterArticle.propTypes = {
    history: PropTypes.object.isRequired
}

export default HelpCenterArticle