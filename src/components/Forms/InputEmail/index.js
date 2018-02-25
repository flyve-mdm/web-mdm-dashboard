import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Confirmation from '../../Confirmation'
import ErrorValidation from '../../ErrorValidation'

class InputEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isCorrect: true,
            errors: [],
            className: 'win-textbox'
        }
    }

    change = (eventObject) => {
        this.props.function(this.props.index, eventObject.target.value)
    }

    componentWillReceiveProps = (newProps) => {
        if (!this.state.isCorrect || newProps.forceValidation) {
            this.validate(newProps.parametersToEvaluate, newProps.email.email)
        }
    }

    validate = (parametersToEvaluate, value) => {
        if (parametersToEvaluate) {
            
            const validation = ErrorValidation.validation(parametersToEvaluate, value)

            this.setState({
                isCorrect: validation.isCorrect,
                errors: validation.errors,
                className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input'
            })
        }
    }

    render() {
        const deleteEmail = async () => {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if(isOK) this.props.delete(this.props.index)
        }

        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <input
                    type={this.props.type}
                    className={this.state.className}
                    name={`email${this.props.index}`}
                    value={this.props.email.email}
                    placeholder={this.props.placeholder}
                    onChange={this.change}
                    onBlur={() => this.validate(this.props.parametersToEvaluate, this.props.email.email)}
                    disabled={this.props.disabled}
                    style={this.props.style}
                />
                <ErrorValidation errors={this.state.errors} />

                <span className="deleteIcon" style={{ margin: 10, fontSize: 18 }} onClick={deleteEmail}/>

                {this.props.delete ? <Confirmation title={`Delete ${this.props.label}`} message={this.props.email.email} reference={el => this.contentDialog = el} /> : <span/>}
            </div>
        )
    }
}

InputEmail.propTypes = {
    label: PropTypes.string.isRequired,
    index: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    email: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    function: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    delete: PropTypes.func,
    parametersToEvaluate: PropTypes.object,
    forceValidation: PropTypes.bool
}

export default InputEmail
    