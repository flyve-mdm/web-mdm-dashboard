import React, { Component } from 'react'

export default class LoginEmail extends Component {

    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: ''
        }
    }
    
    ChangeInput = (input) => {
        this.props.changeValue(input.target.name, input.target.value)
    }
    
    LogInServer = (e) => {
        e.preventDefault()

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (re.test(this.props.email)) {
            this.props.changeValue('phase', 2)
        } else {
            this.setState({
                classInput: 'win-textbox color-line-alert',
                errorMessage: <p className="color-type-alert"> 
                                <span> The email entered is not registered. Try a different account or </span> 
                                <a>create an new</a>
                            </p>
            })
        }
    }

    render () {
    
        return (
            <div className="emailSection">
                <h1>Sign in</h1>
                <span>Use your Flyve account.</span>
                <br />		
                <a href="https://flyve-mdm.com/"> What's this? </a>	
                {this.state.errorMessage}
                <form onSubmit={this.LogInServer}>
                    <input 
                        type="email" 
                        name="email"
                        className={this.state.classInput} 
                        placeholder="Your Email Registered"
                        value={this.props.email} 
                        onChange={this.ChangeInput} 
                        required={true}
                    />
                    <button className="win-button color-accent">Next</button>
                </form>
                <p>No account? <a>Create one!</a></p>
            </div>
            
        )
    }
}