import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from './Calc100PercentMinus'

class EmptyMessage extends Component {
    render () {
        return (
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 className="win-h1" style={{ color: 'grey' }}> 
                        { this.props.message } 
                    </h1>
                </div>
            </div>
        )
    }
}

EmptyMessage.propTypes = {
    itemListPaneWidth: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
}

export default EmptyMessage