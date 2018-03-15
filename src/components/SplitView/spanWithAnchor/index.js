import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class spanWithPopper extends Component {
  render () {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
              { this.props.description }
          </NavLink>
        </div>
      )
    } else {
      return (
        <div onClick={this.props.click}>
            { this.props.description }
        </div>
      )
    }
  }
}
 
spanWithPopper.propTypes = {
  description: PropTypes.string.isRequired,
  to: PropTypes.string,
  click: PropTypes.func
}

export default spanWithPopper