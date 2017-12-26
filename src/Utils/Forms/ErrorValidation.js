import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorValidation extends Component {

    validation = () => {
        let errorMessage
        if (this.props.isRequired && !this.props.data )
            errorMessage = 'Required field'            
        if (this.props.minimunLength) {
            if (this.props.data.length < this.props.minimunLength)
                errorMessage = `Insufficient characters, a minimum of ${this.props.minimunLength} is required`
        }
        if (this.props.needDigit) {
            const myRe = /[\d]/g
            if (!myRe.test(this.props.data)) 
                errorMessage = 'At least one digit is necessary'
        }
        if (this.props.needLowercaseCharacter) {
            const myRe = /[a-z]/g
            if (!myRe.test(this.props.data))
                errorMessage = 'At least one lowercase character is required'
        }
        if (this.props.needUppercaseCharacter) {
            const myRe = /[A-Z]/g
            if (!myRe.test(this.props.data))
                errorMessage = 'At least one uppercase character is required'
        }
        if (this.props.needSymbol) {
            const myRe = /[!@#%^&*?><)(+=._\-\\[\]^~`'"˜$ˆ/:;{}|]/g
            if (!myRe.test(this.props.data))
                errorMessage = 'At least one special character is required'
        }
        if (this.props.isEqualTo) {
            if(this.props.data === this.props.isEqualTo.value)
                errorMessage = this.props.isEqualTo.message
        }   
        if (this.props.extraValidation) {
            if (this.props.extraValidation(this.props.data))
                errorMessage = this.props.extraValidation(this.props.data)
        } 
        
        return errorMessage
    }

    render() {
        return (
            <div className="error-message">
                { this.validation() }
            </div>
        )
    }
}

ErrorValidation.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    isRequired: PropTypes.bool,
    minimunLength: PropTypes.number,
    needDigit: PropTypes.bool,
    needLowercaseCharacter: PropTypes.bool,
    needUppercaseCharacter: PropTypes.bool,
    needSymbol: PropTypes.bool,
    isEqualTo: PropTypes.object,
    extraValidation: PropTypes.func
}

export default ErrorValidation
    