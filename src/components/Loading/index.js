import React from 'react'
import PropTypes from 'prop-types'

const Loading = props => {
    const loader = (
        <div className='loader'>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
        </div>  
    )
    const loadComponent = props.small ? (
        <div className="loading loading--small" style={props.style}>
            <div> { loader } </div>
        </div>
    ) : (
        <div className="loading" style={{marginTop: - props.headerSize, ...props.style}}>
            <div>
                { loader }
                <p>{props.message}</p>
            </div>
        </div>
    )

    return loadComponent
}

Loading.defaultProps = {
    style: {},
    small: false,
    headerSize: 0,
    message: ''
}

Loading.propTypes = {
    message: PropTypes.string,
    headerSize: PropTypes.number,
    small: PropTypes.bool,
    style: PropTypes.object
}

export default Loading