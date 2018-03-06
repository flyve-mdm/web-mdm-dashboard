import React from 'react'
import { NavLink } from 'react-router-dom'

import ImageResponsive from '../../ImageResponsive'

const imgWithPopper = ({to, img, alt, title, disabled}) => (
  <div>
    <NavLink to={to} activeClassName="selected">
      <ImageResponsive alt={alt} src={img} styleNew={{
        width: '20px'
      }}/>
    </NavLink>
  </div>
)
 
export default imgWithPopper;