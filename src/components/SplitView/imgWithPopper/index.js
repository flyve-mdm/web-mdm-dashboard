import React from 'react'
import { Tooltip } from 'react-tippy'
import { NavLink } from 'react-router-dom'

import ImageResponsive from '../../ImageResponsive'

const imgWithPopper = ({to, img, alt, title, disabled}) => (
  <Tooltip
    className='popper'
    disabled={disabled}
    title={title}
    position="right"
    trigger="mouseenter"
    style={{
      display: 'auto'
    }}>
    <NavLink to={to} activeClassName="selected">
      <ImageResponsive alt={alt} src={img} styleNew={{
        width: '30px'
      }}/>
    </NavLink>
  </Tooltip>
)
 
export default imgWithPopper;