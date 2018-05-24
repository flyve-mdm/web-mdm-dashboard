import React, { PureComponent } from 'react'
import handleMessage from '../../shared/handleMessage'
import PropTypes from 'prop-types'

/**
 * Wrapper component to pass to the props the 'handleMessage' function
 * @param { component } WrappedComponent - Component to wrap 
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