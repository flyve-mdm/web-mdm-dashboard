import React from 'react';
import PropTypes from 'prop-types';


const panelItemType = props => (
  <div>
    <h1>{ props.itemType }</h1>
  </div>
) 

panelItemType.propTypes = {
  itemType: PropTypes.string.isRequired,
}

export default panelItemType;