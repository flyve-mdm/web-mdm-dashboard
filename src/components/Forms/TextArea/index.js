import React from 'react'
import PropTypes from 'prop-types'

const TextArea = props =>  {
    return (
        <div className="froms__col">
            <p>{props.label}</p>
            <textarea
                rows={props.rows}
                className="win-textarea"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(event) => props.function(props.name, event.target.value)}
                disabled={props.disabled}
                style={props.style}
                required={props.required}
            />
        </div>
    )
}

TextArea.defaultProps = {
    label: '',
    required: false,
    rows: 6
}

TextArea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    function: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    required: PropTypes.bool,
    rows: PropTypes.number
}

export default TextArea