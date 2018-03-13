import React from 'react'
import PropTypes from 'prop-types'

const EmptyMessage = props => (
    <div className="center-block-content">
            <h1 className="win-h1" style={{ color: 'grey' }}> 
                { props.message } 
            </h1>
    </div>
)

EmptyMessage.propTypes = {
    itemListPaneWidth: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
}

EmptyMessage.defaultProps = {
    itemListPaneWidth: 320,
    message: "No Selection"
}

export default EmptyMessage