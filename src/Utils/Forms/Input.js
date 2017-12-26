import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../Confirmation'
import ErrorValidation from './ErrorValidation'

class Input extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isCorrect: true,
            errors: [],
            className: 'win-textbox'
        }
    }

    change = (eventObject) => {
        this.props.function(this.props.name, eventObject.target.value)
    }

    componentWillReceiveProps = (newProps) => {
        if (!this.state.isCorrect) {
            this.validate(newProps.parametersToEvaluate, newProps.value)
        }
    }

    validate = (parametersToEvaluate, value) => {
        if (parametersToEvaluate) {
            
            const newParametersToEvaluate = {
                ...parametersToEvaluate,
                data: value
            }
            
            const validation = ErrorValidation.validation(newParametersToEvaluate)

            this.setState({
                isCorrect: validation.isCorrect,
                errors: validation.errors,
                className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input'
            })
        }
    }


    render() {
        let deleteIcon 
        const deleteEmail = async () => {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if(isOK) this.props.delete(this.props.name)
        }
        if (this.props.delete) deleteIcon = <span className="deleteIcon" style={{ margin: 10, fontSize: 18 }} onClick={deleteEmail}/>
        const required = (this.props.required === true)

        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <input
                    type={this.props.type}
                    className={this.state.className}
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.change}
                    onBlur={() => this.validate(this.props.parametersToEvaluate, this.props.value)}
                    disabled={this.props.disabled}
                    style={this.props.style}
                    required={required}
                />
                <ErrorValidation errors={this.state.errors} />
                { deleteIcon }
                {this.props.delete ? <Confirmation title={`Delete ${this.props.label}`} message={this.props.value} reference={el => this.contentDialog = el} /> : <span/>}
            </div>
        )
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    function: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    delete: PropTypes.func,
    required: PropTypes.bool,
    validation: PropTypes.func,
    parametersToEvaluate: PropTypes.object
}

export default Input
    