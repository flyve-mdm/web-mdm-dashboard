import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../Confirmation'
import ErrorValidation from './ErrorValidation'

class Input extends Component {

    change = (eventObject) => {
        this.props.function(this.props.name, eventObject.target.value)
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
                    className="win-textbox"
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.change}
                    disabled={this.props.disabled}
                    style={this.props.style}
                    required={required}
                />
                <ErrorValidation {...this.props.parametersToEvaluate} data={this.props.value} />
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
    