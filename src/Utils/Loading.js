
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
    render () {
        const headerSize = this.props.headerSize ? this.props.headerSize : 0

        return (
            <div className="loading" style={{ marginTop: - headerSize, display: 'flex', height: '100%', justifyContent: 'center', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div>
                    <div className='loader'>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                    </div>   
                    <p>{this.props.message}</p>
                </div>
            </div>
        )
    }
}

Loading.propTypes = {
    message: PropTypes.string,
    headerSize: PropTypes.number
}

export default Loading