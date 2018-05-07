import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class PanelFields extends PureComponent {
  render() { 
    return (
      <div className="searchListHeader">
        {this.props.fields.map(field => {
          let fieldKey = `${field[0]}_${field[1]}`;
          let fieldName = field[1];
          return (
            <div key={fieldKey} className="cellHeader">{fieldName}</div>
          )
        })}
      </div> 
    )
  }
}

PanelFields.propTypes = {
  fields: PropTypes.array.isRequired
}
 
export default PanelFields;