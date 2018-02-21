
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
    render () {
        const headerSize = this.props.headerSize ? this.props.headerSize : 0

        const loadComponent = this.props.small ? (
            <div className="loading" style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px'}}>
                <div>
                    <div className='small-loader'>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                    </div>   
                </div>
            </div>
        ) : (
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

        return loadComponent
    }
}

Loading.propTypes = {
    message: PropTypes.string,
    headerSize: PropTypes.number,
    small: PropTypes.bool
}

export default Loading