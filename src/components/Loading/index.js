import React from 'react'
import PropTypes from 'prop-types'

const Loading = props => {
    const headerSize = props.headerSize ? props.headerSize : 0

    const loadComponent = props.small ? (
        <div className="loading" style={{
            display: 'inline-block',
            verticalAlign: 'middle', 
            margin: '10px'
        }}>
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
        <div className="loading" style={{
                marginTop: - headerSize,
                display: 'flex',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column'
        }}>
            <div>
                <div className='loader'>
                    <div className='circle'></div>
                    <div className='circle'></div>
                    <div className='circle'></div>
                    <div className='circle'></div>
                    <div className='circle'></div>
                </div>   
                <p>{props.message}</p>
            </div>
        </div>
    )

    return loadComponent
}

Loading.propTypes = {
    message: PropTypes.string,
    headerSize: PropTypes.number,
    small: PropTypes.bool
}

export default Loading