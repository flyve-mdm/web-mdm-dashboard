import React from 'react';
import { updateObject } from '../../shared/updateObject';

let style = { 
  width: '100%',
  maxWidth: '100%',
  height: 'auto'
}

const imageResponsive = ({src, alt, styleNew={}}) => (
  <img style={updateObject(style, styleNew)} src={src} alt={alt} />
)

export default imageResponsive;