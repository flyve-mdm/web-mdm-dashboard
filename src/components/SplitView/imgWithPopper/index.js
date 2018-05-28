import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

class imgWithPopper extends PureComponent {
  render () {
    return (
      <div>
        <NavLink to={this.props.to} activeClassName="selected">
          <img 
            alt={this.props.alt} 
            src={this.props.img} 
            style={{ 
              width: '20px',
              maxWidth: '100%',
              height: 'auto'
            }}
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
  alt: PropTypes.string,
  title: PropTypes.string
}

export default imgWithPopper