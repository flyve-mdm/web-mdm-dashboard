import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class iconWithPopper extends Component {
  render () {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            <span className={this.props.iconName} title={this.props.title}/>
          </NavLink>
        </div>
      )
    } else {
      return (
        <div onClick={this.props.click}>
          <a>
            <span className={this.props.iconName} title={this.props.title}/>
          </a>
        </div>
      )
    }
  }
}

iconWithPopper.propTypes = {
  to: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  click: PropTypes.func
}

export default iconWithPopper