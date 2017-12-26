import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorValidation extends Component {

    render() {
        const errorMessage = this.props.validation(this.props.data)
        return (
            <div className="error-message">
                { errorMessage }
            </div>
        )
    }
}

ErrorValidation.propTypes = {
    data: PropTypes.object,
    validation: PropTypes.func.isRequired
}

export default ErrorValidation
    