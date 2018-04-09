import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import { uiSetNotification } from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from 'react-i18nify'
import itemtype from '../../../../shared/itemtype'
import getID from '../../../../shared/getID'

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
            id: getID(this.props.history.location.pathname, 4),
            isLoading: true
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                article: await this.props.glpi.getAnItem({itemtype: itemtype.KnowbaseItem, id: this.state.id}),
                isLoading: false
            })
        } catch (error) {
            this.props.actions.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({
                isLoading: false
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
                <div style={{height: "100%", marginTop: "-80px"}}><Loading message={`${I18n.t('commons.loading')}...`} /></div> :
                    <ContentPane>
                        <h2>{this.state.article.name}</h2>
                        <div className="date">{this.state.article.date}</div>                        
                        <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.state.article.answer) }} />
                    </ContentPane>
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
)(withGLPI(withHandleMessages(HelpCenterArticle)))