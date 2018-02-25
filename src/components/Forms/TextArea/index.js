import React from 'react'
import PropTypes from 'prop-types'

const TextArea = props =>  {
    return (
        <div className="list-col">
            <p>{props.label}</p>
            <textarea
                rows="6"
                type={props.type}
                className="win-textarea"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(event) => props.function(props.name, event.target.value)}
                disabled={props.disabled}
                style={props.style}
            />
        </div>
    )
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