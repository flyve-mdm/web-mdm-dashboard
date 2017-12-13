import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextArea extends Component {

    change = (eventObject) => {
        this.props.function(this.props.name, eventObject.target.value)
    }

    render() {
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <textarea
                    rows="6"
                    type={this.props.type}
                    className="win-textarea"
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.change}
                    disabled={this.props.disabled}
                    style={this.props.style}
                />
            </div>
        )
    }
}

TextArea.propTypes = {
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
    delete: PropTypes.func
}

export default TextArea
    