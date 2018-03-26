import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from "../../../../components/Loading"
import withGLPI from "../../../../hoc/withGLPI"
import { uiSetNotification } from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class HelpCenterArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: undefined,
            id: this.props.history.location.pathname.split("/")[4],
            isLoading: true
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                article: await this.props.glpi.getAnItem({itemtype: "KnowbaseItem", id: this.state.id}),
                isLoading: false
            })
        } catch (error) {
            this.props.actions.setNotification({
                title: error[0],
                body: error[1],
                type: 'alert'
            })
        }
    }

    htmlDecode (input) {
        const e = document.createElement('div')
        e.innerHTML = input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue
    }
      
    render () {
        return (
            this.state.isLoading ? 
                <Loading /> :
                    <div className="listPane" style={{ padding: 0 }}>
                        <h3>{this.state.article.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.state.article.answer) }} />
                    </div>
        ) 
    }
}

HelpCenterArticle.propTypes = {
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default connect(
    null,
    mapDispatchToProps
)(withGLPI(HelpCenterArticle))