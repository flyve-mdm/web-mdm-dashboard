import React, { Component } from 'react'
import PropTypes from 'prop-types'

class spanWithPopper extends Component {
  render () {
    return (
      <div>
        <span>
          { this.props.description }
        </span>
      </div>
    )
  }
}
 
spanWithPopper.propTypes = {
  description: PropTypes.string.isRequired
}

export default spanWithPopper