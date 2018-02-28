import React from 'react'
import { NavLink } from 'react-router-dom'

const iconWithPopper = ({to, iconName, title, disabled}) => (
  <div>
    <NavLink to={to} activeClassName="selected">
      <span className={iconName}/>
    </NavLink>
  </div>
)
 
export default iconWithPopper;