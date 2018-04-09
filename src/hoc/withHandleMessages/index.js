import React, { Component } from 'react'
import handleMessage from '../../shared/handleMessage'

/**
 * 
 * @param { React Component } WrappedComponent 
 * 
 */

const withHandleMessages = (WrappedComponent) => {
    class HandleError extends Component {

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    HandleError.defaultProps = {
        handleMessage: handleMessage
    }

    return HandleError
}

export default withHandleMessages