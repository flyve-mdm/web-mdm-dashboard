import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../Confirmation'
import ErrorValidation from '../../ErrorValidation'
import { I18n } from "react-i18nify"

class InputEmail extends PureComponent {

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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.isCorrect || nextProps.forceValidation) {
            if (nextProps.parametersToEvaluate) {

                const validation = ErrorValidation.validation(nextProps.parametersToEvaluate, nextProps.email.email)
                return {
                    isCorrect: validation.isCorrect,
                    errors: validation.errors,
                    className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input'
                }
            } else {
                return {
                    ...prevState
                }
            }
        } else {
            return {
                ...prevState
            }
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
            <div className="froms__col">
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

                {this.props.delete ? <Confirmation title={`${I18n.t('commons.delete')} ${this.props.label}`} message={this.props.email.email} reference={el => this.contentDialog = el} /> : <span/>}
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
    