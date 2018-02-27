import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PanelFields extends Component {
  render() { 
    return ( 
      <thead>
        <tr>
          {this.props.fields.map(field => {
            let fieldKey = field[0];
            let fieldName = field[1];
            return (
              <th key={fieldKey}>
                { fieldName }
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
}

PanelFields.propTypes = {
  fields: PropTypes.array.isRequired
}
 
export default PanelFields;