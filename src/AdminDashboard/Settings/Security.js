import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import Confirmation from '../../Utils/Confirmation'
import ErrorValidation from '../../Utils/Forms/ErrorValidation'
import ConstructInputs from '../../Utils/Forms'

class Security extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            passwordConfirmation: '',
            forceValidation: false
        }
    }

    deleteUser = async () => {
        const isOK = await Confirmation.isOK(this.deleteAccount)
        if (isOK) {
            
        }
    }

    savePassword = () => {
        this.setState({ forceValidation: true })
        console.log(this.state)
        
    }

    savePassword = (e) => {
        e.preventDefault()
        const password = this.buildDataArray()
        let isCorrect = true

        for (const key in password) {
            if (password.hasOwnProperty(key)) {
                const elements = password[key]
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index]
                    console.log(element.value)
                    if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                        isCorrect = false
                }
            }
        }

        console.log(isCorrect)
        
        if (isCorrect) {
            this.changeMode('')
        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    changeState = (name, value) => { 
        this.setState({
            [name]: value
        })
    }

    changeMode = (mode) => {
        this.setState({ forceValidation: false })
        this.setState({ mode })
    }

    buildDataArray = () => {
        return [
            [
                {
                    label: "Password",
                    type: "password",
                    name: "password",
                    value: this.state.password,
                    placeholder: "Password",
                    function: this.changeState,
                    parametersToEvaluate: { isRequired: true },
                    forceValidation: this.state.forceValidation ,
                    disabled: false,
                    style: null
                },
                {
                    label: "Password (confirmation)",
                    type: "password",
                    name: "passwordConfirmation",
                    value: this.state.passwordConfirmation,
                    placeholder: "Password confirmation",
                    function: this.changeState,
                    parametersToEvaluate: { isRequired: true },
                    forceValidation: this.state.forceValidation ,
                    disabled: false,
                    style: null
                }
            ]
        ]
    }

    render () {
        switch (this.state.mode) {
            case 'Edit password':
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2"> Security </h2>

                    <form className="list-content" onSubmit={this.savePassword}>
  
                        <ConstructInputs data={this.buildDataArray()} />

                        <br/>

                        <button className="win-button" 
                            type="button"
                            style={{marginRight: 10}} 
                            onClick={() => this.changeMode("")}
                        >
                            Cancel
                        </button>

                        <button className="win-button win-button-primary">
                            Save
                        </button>

                    </form>


                </ContentPane>
            )           
            default:
            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2"> Security </h2>
                      
                      <div className="listElement">
                          <div className="message">
                              Password
                              <div className="detail">Change your FlyveMDM Account password</div>
                          </div>
                          <div className="controller">
                            <button className="win-button" onClick={() => this.changeMode('Edit password')}>
                                Edit
                            </button>
                          </div>
                      </div>
      
                      <div className="listElement">
                          <div className="message">
                              Kill session
                              <div className="detail">Destroy the session identified by your session token</div>
                          </div>
                          <div className="controller">
                              <button className="win-button">Logout</button>
                          </div>
                      </div>
      
                      <div className="listElement">
                          <div className="message">
                              Delete browser data
                              <div className="detail">Delete Web Storage and Indexed Database</div>
                          </div>
                          <div className="controller">
                              <button className="win-button">Delete</button>
                          </div>
                      </div>
      
                      <div className="listElement">
                          <div className="message">
                              Delete account
                              <div className="detail">This action remove all information related to the user and the entity</div>
                          </div>
                          <div className="controller">
                              <button className="win-button" onClick={this.deleteUser}>Delete</button>
                          </div>
                      </div>
                      
                      <Confirmation 
                          title="Please confirm account deletion"
                          message="Are you certain to delete the account?"
                          reference={el => this.deleteAccount = el} 
                      />
                </ContentPane>            
            )

        }
    }
}

Security.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Security