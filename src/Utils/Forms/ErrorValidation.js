import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorValidation extends Component {

    static validation = (parametersToEvaluate) => {
        let errorMessages = []

        if (parametersToEvaluate.isRequired && !parametersToEvaluate.data )
            errorMessages.push( 'Required field' )
        if (parametersToEvaluate.minimunLength) {
            if (parametersToEvaluate.data.length < parametersToEvaluate.minimunLength)
                errorMessages.push( `Insufficient characters, a minimum of ${parametersToEvaluate.minimunLength} is required` )
        }
        if (parametersToEvaluate.needDigit) {
            const myRe = /[\d]/g
            if (!myRe.test(parametersToEvaluate.data)) 
                errorMessages.push( 'At least one digit is necessary' )
        }
        if (parametersToEvaluate.needLowercaseCharacter) {
            const myRe = /[a-z]/g
            if (!myRe.test(parametersToEvaluate.data))
                errorMessages.push( 'At least one lowercase character is required' )
        }
        if (parametersToEvaluate.needUppercaseCharacter) {
            const myRe = /[A-Z]/g
            if (!myRe.test(parametersToEvaluate.data))
                errorMessages.push( 'At least one uppercase character is required' )
        }
        if (parametersToEvaluate.needSymbol) {
            const myRe = /[!@#%^&*?><)(+=._\-\\[\]^~`'"˜$ˆ/:;{}|]/g
            if (!myRe.test(parametersToEvaluate.data))
                errorMessages.push( 'At least one special character is required' )
        }
        if (parametersToEvaluate.isEqualTo) {
            if(parametersToEvaluate.data !== parametersToEvaluate.isEqualTo.value)
                errorMessages.push( parametersToEvaluate.isEqualTo.message )
        }   
        if (parametersToEvaluate.customValidation) {
            if (parametersToEvaluate.customValidation(parametersToEvaluate.data))
                errorMessages.push( parametersToEvaluate.customValidation(parametersToEvaluate.data) )
        } 

        const result = (errorMessages.length <= 0) ? {isCorrect: true, errors: []} : {isCorrect: false, errors: errorMessages}

        return result
    }

    render() {
        return (
            <div className="error-message">
                <ul>
                    { this.props.errors.map((element, index) => {
                        return <li key={index}>- {element}</li>
                    }) }
                </ul>
            </div>
        )
    }
}

ErrorValidation.propTypes = {
    errors: PropTypes.array
}

export default ErrorValidation
    