import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ImageResponsive from '../../ImageResponsive'
import PropTypes from 'prop-types'

class imgWithPopper extends Component {
  render () {
    return (
      <div>
        <NavLink to={this.props.to} activeClassName="selected">
          <ImageResponsive 
            alt={this.props.alt} 
            src={this.props.img} 
            styleNew={{ width: '20px' }}
            title={this.props.title}
          />
        </NavLink>
      </div>
    )
  }
}
 
imgWithPopper.defaultProps = {
  alt: ""
}

imgWithPopper.propTypes = {
  to: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default imgWithPopper