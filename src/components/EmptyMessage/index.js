import React from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../shared/calc100PercentMinus'

const EmptyMessage = props => (
    <div className="contentPane" style={{ width: Calc100PercentMinus(props.itemListPaneWidth) }}>
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 className="win-h1" style={{ color: 'grey' }}> 
                { props.message } 
            </h1>
        </div>
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