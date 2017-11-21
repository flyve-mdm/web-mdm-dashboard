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
        console.log('login ˆ_ˆ')
        this.props.history.push(`/app`)
                // this.setState({
                //         classInput: 'color-line-alert',
                //         errorMessage: <p className="win-textbox color-type-alert"> 
                //                         Your account or password is incorrect. If you don't remember your password, 
                //                         <a> reset it now.</a>
                //                       </p>
                //     })
    }

    render () { 
        return (
            <div className="passwordSection">
                <h1>Enter password</h1>
                <span>Enter the password for</span>	<br />
                <span>{this.props.email}</span>	
                {this.state.errorMessage}
                <form onSubmit={this.LogInServer}>
                    <input 
                        type="password" 
                        name="password" 
                        className={this.state.classInput}
                        placeholder="Password"
                        value={this.props.password} 
                        onChange={this.ChangeInput} 
                        required={true}
                    />
                    <button 
                        className="win-button" 
                        type="button" 
                        onClick={() => this.props.changeValue('phase', 1)}
                    >
                        Back 
                    </button>

                    <button type="submit" className="win-button">Sing in</button>
                </form>
                <a>Forgot my password</a>
            </div>
            
        )
    }
}