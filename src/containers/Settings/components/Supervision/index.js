import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { supervisionScheme } from '../../../../components/Forms/Schemas'
import validateData from '../../../../shared/validateData'
import supervision from '../../../../AdminDashboard/data/supervision.json'
import ConstructInputs from '../../../../components/Forms'
import Title from '../../../../components/Title'

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
        this.props.showNotification('Success', 'Helpdesk configuration saved')
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
                <Title text="Supervision" />
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
    showNotification: PropTypes.func.isRequired
}

export default Supervision