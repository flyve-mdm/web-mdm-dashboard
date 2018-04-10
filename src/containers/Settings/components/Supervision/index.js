import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { supervisionScheme } from '../../../../components/Forms/Schemas'
import validateData from '../../../../shared/validateData'
import ConstructInputs from '../../../../components/Forms'
import { bindActionCreators } from 'redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { connect } from 'react-redux'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from 'react-i18nify'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
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
            name: undefined,
            phone: undefined,
            website: undefined,
            email: undefined,
            address: undefined,
            entityID: undefined,
            isLoading: true
        }
    }

    saveChanges = () => {
        this.setState ({isLoading: true}, async () => {
            try {
                await this.props.glpi.updateItem({ 
                    itemtype: itemtype.Entity, 
                    id: `${this.state.entityID}`,                    
                    input: {
                        name: this.state.name,
                        phonenumber: this.state.phone,
                        website: this.state.website,
                        email: this.state.email,
                        address: this.state.address
                    }
                })
                this.setState ({isLoading: false})            
                this.props.actions.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.helpdesk_configuration_saved'),
                    type: 'success'
                })
            } catch (error) {
                this.props.actions.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState ({isLoading: false})
            }
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
            let entityID
            if (Array.isArray(active_profile.entities)) {
                entityID = active_profile.entities[0].id
            } else {
                for (const key in active_profile.entities) {
                    if (active_profile.entities.hasOwnProperty(key)) {
                        entityID = active_profile.entities[key].id
                    }
                }
            }
            const entity = await this.props.glpi.getAnItem({itemtype: itemtype.Entity, id: entityID})
            this.setState ({
                isLoading: false,
                entityID,
                name: validateData(entity.name),
                phone: validateData(entity.phonenumber),
                website: validateData(entity.website),
                email: validateData(entity.email),
                address: validateData(entity.address)
            })            
        } catch (error) {
            this.props.actions.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState ({isLoading: false})
        }
    }

    render() {

        const supervision = supervisionScheme({
            state: this.state,
            changeState: this.changeState
        })

        return (
            this.state.isLoading ? <Loading message={`${I18n.t('commons.loading')}...`}/> : 
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
                            <button className="btn --primary" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
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

export default connect(null, mapDispatchToProps)(withGLPI(withHandleMessages(Supervision)))
