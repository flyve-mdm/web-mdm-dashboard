import React from 'react'
import { Tooltip } from 'react-tippy'
import { NavLink } from 'react-router-dom';

import 'react-tippy/dist/tippy.css'

const iconWithPopper = ({to, iconName, title, disabled}) => (
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
      <span className={iconName}/>
    </NavLink>
  </Tooltip>
)
 
export default iconWithPopper;