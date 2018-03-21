import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { supervisionScheme } from '../../../../components/Forms/Schemas'
import validateData from '../../../../shared/validateData'
import supervision from '../../../../AdminDashboard/data/supervision.json'
import ConstructInputs from '../../../../components/Forms'
import { bindActionCreators } from 'redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { connect } from 'react-redux'

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
            address: validateData(supervision["Supervision.address"])
        }
    }

    saveChanges = () => {
        this.props.actions.setNotification({
            title: 'Successfully',
            body: 'Helpdesk configuration saved',
            type: 'info'
        })
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {

        const supervision = supervisionScheme({
            state: this.state,
            changeState: this.changeState
        })

        return (
            <div>
                <h2>Supervision</h2>
                <div className="list-content Profiles" style={{marginTop: '20px'}}>
                    <ConstructInputs data={supervision.helpDeskInformation} icon="supervisionIcon" title="Helpdesk Information" />
                    <button className="win-button" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                        Save
                    </button>
                    <br />
                </div>
            </div>
        )
    }
}

Supervision.propTypes = {
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(Supervision)
