import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { I18n } from "react-i18nify"

class ErrorValidation extends Component {

    static validation = (parametersToEvaluate, value) => {
        let errorMessages = []

        if (parametersToEvaluate.isRequired && !value )
            errorMessages.push( I18n.t('validation.required_field') )
        if (parametersToEvaluate.minimunLength) {
            if (value.length < parametersToEvaluate.minimunLength)
                errorMessages.push( `${I18n.t('validation.insufficient_characters')} ${parametersToEvaluate.minimunLength} ${I18n.t('validation.is_requiered')}` )
        }
        if (parametersToEvaluate.needDigit) {
            const myRe = /[\d]/g
            if (!myRe.test(value)) 
                errorMessages.push( I18n.t('validation.one_digit') )
        }
        if (parametersToEvaluate.needLowercaseCharacter) {
            const myRe = /[a-z]/g
            if (!myRe.test(value))
                errorMessages.push( I18n.t('validation.lowercase_character') )
        }
        if (parametersToEvaluate.needUppercaseCharacter) {
            const myRe = /[A-Z]/g
            if (!myRe.test(value))
                errorMessages.push( I18n.t('validation.uppercase_character') )
        }
        if (parametersToEvaluate.needSymbol) {
            const myRe = /[!@#%^&*?><)(+=._\-\\[\]^~`'"˜$ˆ/:;{}|]/g
            if (!myRe.test(value))
                errorMessages.push( I18n.t('validation.special_character') )
        }
        if (parametersToEvaluate.isEmail) {
            const myRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
            if (!myRe.test(value))
                errorMessages.push( I18n.t('validation.invalid_email') )
        }
        if (parametersToEvaluate.isEqualTo) {
            if(value !== parametersToEvaluate.isEqualTo.value)
                errorMessages.push( parametersToEvaluate.isEqualTo.message )
        }   
        if (parametersToEvaluate.customValidation) {
            if (parametersToEvaluate.customValidation(value))
                errorMessages.push( parametersToEvaluate.customValidation(value) )
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