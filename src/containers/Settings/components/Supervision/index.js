import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { supervisionScheme } from '../../../../components/Forms/Schemas'
import validateData from '../../../../shared/validateData'
import supervision from '../../../../data/supervision.json'
import ConstructInputs from '../../../../components/Forms'
import { bindActionCreators } from 'redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { connect } from 'react-redux'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from 'react-i18nify'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import itemtype from '../../../../shared/itemtype'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class Supervision extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: validateData(supervision["Supervision.name"]),
            phone: validateData(supervision["Supervision.phone"]),
            website: validateData(supervision["Supervision.website"]),
            email: validateData(supervision["Supervision.email"]),
            address: validateData(supervision["Supervision.address"]),
            isLoading: true
        }
    }

    saveChanges = () => {
        this.props.actions.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.helpdesk_configuration_saved'),
            type: 'info'
        })
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    componentDidMount = async () => {
        try {
            const { active_profile } = await this.props.glpi.getActiveProfile()
            const entity = await this.props.glpi.getAnItem({itemtype: itemtype.Entity, id: active_profile.entities[0].id})
            this.setState ({isLoading: false})            
        } catch (error) {
            this.setState ({isLoading: false})            
            this.props.setNotification({
                title: error[0],
                body: error[1],
                type: 'alert'
            })
        }
    }

    render() {

        const supervision = supervisionScheme({
            state: this.state,
            changeState: this.changeState
        })

        return (
            this.state.isLoading ? <Loading/> : 
                (
                    <ContentPane>
                        <h2>
                            {I18n.t('settings.supervision.title')}
                        </h2>
                        <div className="list-content Profiles" style={{marginTop: '20px'}}>
                            <ConstructInputs 
                                data={supervision.helpDeskInformation} 
                                icon="supervisionIcon" 
                                title={I18n.t('settings.supervision.helpdesk')} 
                            />
                            <button className="win-button" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                                {I18n.t('commons.save')}
                            </button>
                            <br />
                        </div>
                    </ContentPane>
                )
            
        )
    }
}

Supervision.propTypes = {
    actions: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(withGLPI(Supervision))
