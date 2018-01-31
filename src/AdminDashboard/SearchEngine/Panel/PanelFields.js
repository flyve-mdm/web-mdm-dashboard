import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PanelFields extends Component {
  render() { 
    return ( 
      /*
      * TODO: Fix bug: The Operating System field is being supplanted by the Name Field
      */
      <thead>
        <tr>
          {this.props.fields.map(field => {
            return (
              <th key={field}>
                { field }
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