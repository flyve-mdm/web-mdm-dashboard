import React from 'react'
import { NavLink } from 'react-router-dom'

const iconWithPopper = ({to, iconName, title, disabled, click}) => {
  if (typeof(to) === "string") {
    return (
      <div>
        <NavLink to={to} activeClassName="selected">
          <span className={iconName}/>
        </NavLink>
      </div>
    )
  } else {
    return (
      <div onClick={click}>
        <a>
          <span className={iconName}/>
        </a>
      </div>
    )
  }
}
 
export default iconWithPopper;