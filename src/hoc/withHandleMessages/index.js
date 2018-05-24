import React, { PureComponent } from 'react'
import handleMessage from '../../shared/handleMessage'
import PropTypes from 'prop-types'

/**
 * 
 * @param { React Component } WrappedComponent 
 * @param { Object with method and parameters strings} fetch 
 */
const withHandleMessages = (WrappedComponent) => {
    class HandleMessages extends PureComponent {

        render() {
            return <WrappedComponent handleMessage={handleMessage} {...this.props} />
        }
    }

    HandleMessages.propTypes = {
        history: PropTypes.object.isRequired
    }

    return HandleMessages
}

export default withHandleMessages