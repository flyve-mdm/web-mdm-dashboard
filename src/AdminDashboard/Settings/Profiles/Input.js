import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    render() {
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <input 
                    type={this.props.type} 
                    className="win-textbox" 
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.function}
                    disabled={this.props.disabled}
                    style={this.props.style}
                />
            </div>            
        )
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    function: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object
}

export default Input
    