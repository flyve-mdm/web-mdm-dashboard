import React from 'react'
import { updateObject } from '../../shared/updateObject'

let style = { 
  width: '100%',
  maxWidth: '100%',
  height: 'auto'
}

const ImageResponsive = ({src, alt, styleNew={}, title}) => (
  <img style={updateObject(style, styleNew)} src={src} alt={alt} title={title} />
)

export default ImageResponsive