import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            surname: '',
            firstName: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    componentDidMount() {
        const selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)

        this.setState({
            login: selectedItemList["User.name"],
            surname: '',
            firstName: '',
        })
    }

    sendChanges = () => {
        this.props.changeActionList(null)
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <h2 className="win-h2 titleContentPane" onClick={() =>this.changeSelectItem([])}>
                    Edit User
                </h2>
                <p>Please insert an active email address.</p>
                <p>An email will be sent with a QR code.</p>
                <div>
                    <b>Login </b> <br/>
                    <input 
                        type="text" 
                        className="win-textbox" 
                        placeholder="Login"
                        name="login"
                        value={this.state.login}
                        onChange={this.changeInput}
                        required
                    />
                </div>
                <div>
                    <b>Surname </b> <br/>
                    <input 
                        type="text" 
                        className="win-textbox" 
                        placeholder="Surname"
                        name="surname"
                        value={this.state.surname}
                        onChange={this.changeInput}
                    />
                </div>
                <div>
                    <b>First name </b> <br/>
                    <input 
                        type="text" 
                        className="win-textbox" 
                        placeholder="First name"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.changeInput}
                    />
                </div>
                <div>
                    <b>Password </b> <br/>
                    <input 
                        type="password" 
                        className="win-textbox" 
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeInput}
                        required
                    />
                </div>
                <div>
                    <b>Password (confirmation) </b> <br/>
                    <input 
                        type="password" 
                        className="win-textbox" 
                        placeholder="Password"
                        name="passwordConfirmation"
                        value={this.state.passwordConfirmation}
                        onChange={this.changeInput}
                        required
                    />
                </div>
                
                <br/>

                <button className="win-button" onClick={() => this.props.changeActionList(null)}>Cancel</button>
                <button 
                    className="win-button win-button-primary" 
                    style={{marginLeft: 10}}
                    onClick={this.sendChanges}
                >
                    Save
                </button>
            </div>
        )
    }
}
EditUser.propTypes = {
    changeActionList: PropTypes.func.isRequired
}
