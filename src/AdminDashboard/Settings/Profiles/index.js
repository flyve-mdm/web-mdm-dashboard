import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../../Utils/Calc100PercentMinus'
import currentUser from '../../data/currentUser.json'
import validateData from '../../../Utils/validateData'

class Profiles extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            buttonSaveClassName: "win-button win-button-primary hidden",
            login: validateData(currentUser["User.name"], undefined),
            firstName: validateData(currentUser["User.firstname"]),
            realname: validateData(currentUser["User.realname"]),
            phone: validateData(currentUser["User.phone"]),
            mobilePhone: validateData(currentUser["User.mobile"]),
            phone2: validateData(currentUser["User.phone2"]),
            administrativeNumber: validateData(currentUser["User.registration_number"]),
            lastLogin: validateData(currentUser["User.last_login"], undefined),
            created: validateData(currentUser["User.date_creation"], undefined),
            modified: validateData(currentUser["User.date_mod"], undefined) 
        }
    }

    saveChanges = () => {
        this.setState({
            buttonSaveClassName: "win-button win-button-primary hidden"
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.buttonSaveClassName === "win-button win-button-primary hidden") {
            this.setState({
                buttonSaveClassName: "win-button win-button-primary"
            })
        }
    }

    render () {
        return (
            <div className="contentPane list-content Profiles" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <h2 className="win-h2"> Profiles </h2>

                <div className="listElement icon">
                    <span className="contactIcon"/>
                </div>

                <div className="listElement">  
                    <div className="list-col">
                        <p>login</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            placeholder="User name"
                            name="login"
                            disabled                            
                            style={{
                                width: 'auto'
                            }}
                            value={this.state.login}
                        />
                    </div>              
                </div>

                <div className="listElement">

                    <div className="list-col">
                        <p>Surname</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            placeholder="Surname"
                            name="realname"
                            value={this.state.realname}
                            onChange={this.changeInput}
                        />
                    </div>  

                    <div className="list-col">
                        <p>First name</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            placeholder="First name"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.changeInput}
                        />
                    </div>   
                    
             
                </div>

            

                <div className="listElement icon">
                    <span className="phoneIcon"/>
                </div>

                <div className="listElement">

                    <div className="list-col">
                        <p>Phone</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            placeholder="Phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.changeInput}
                        />
                    </div>   

                    <div className="list-col">
                        <p>Mobile phone</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            placeholder="Mobile phone"
                            name="mobilePhone"
                            value={this.state.mobilePhone}
                            onChange={this.changeInput}
                        />
                    </div>            
                </div>

                <div className="listElement">
                    <div className="list-col">
                        <p>Phone 2</p>
                        <input 
                            type="number" 
                            className="win-textbox" 
                            placeholder="Phone 2"
                            name="phone2"
                            value={this.state.phone2}
                            onChange={this.changeInput}
                        />
                    </div>   

                    <div className="list-col">
                        <p>Administrative number</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            placeholder="Administrative number"
                            name="administrativeNumber"
                            value={this.state.administrativeNumber}
                            onChange={this.changeInput}
                        />
                    </div> 
                </div>

                <div className="listElement icon">
                    <span className="documentIcon"/>
                </div>

                <div className="listElement">
                    <div className="list-col">
                        <p>Last login</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            name="lastLogin"
                            value={this.state.lastLogin}
                            disabled
                            style={{
                                width: '100%'
                            }}
                        />
                    </div> 

                    <div className="list-col">
                        <p>Created</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            name="created"
                            value={this.state.created}
                            disabled
                            style={{
                                width: 'auto'
                            }}
                        />
                    </div> 

                    <div className="list-col">
                        <p>Modified</p>
                        <input 
                            type="text" 
                            className="win-textbox" 
                            name="modified"
                            value={this.state.modified}
                            disabled
                            style={{
                                width: 'auto'
                            }}
                        />
                    </div> 
                </div>


                

                <button className={ this.state.buttonSaveClassName } style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                    Save
                </button>
                
                <br/>
            </div>
        )
    }
}

Profiles.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Profiles