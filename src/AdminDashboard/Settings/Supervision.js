import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import ConstructInputs from '../../Utils/Forms'
import supervisionData from '../data/supervision.json'
import validateData from '../../Utils/validateData'
import { supervisionScheme } from '../../Utils/Forms/Schemes'

export default class Supervision extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: validateData(supervisionData["Supervision.name"]),
            phone: validateData(supervisionData["Supervision.phone"]),
            website: validateData(supervisionData["Supervision.website"]),
            email: validateData(supervisionData["Supervision.email"]),
            address: validateData(supervisionData["Supervision.address"])
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
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="list-content Profiles">

                    <ConstructInputs data={supervision.helpDeskInformation} icon="supervisionIcon" title="Helpdesk Information" />
                    <button className="win-button win-button-primary" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                        Save
                    </button>
                    <br />
                </div>
            </ContentPane>
        )
    }
}

Supervision.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    showNotification: PropTypes.func.isRequired
}
