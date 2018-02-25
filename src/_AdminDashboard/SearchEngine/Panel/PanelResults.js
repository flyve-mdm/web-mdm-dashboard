import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PanelResults extends Component {
  render() { 
    let tbodyContent = null;

    if (this.props.itemResults) {
      tbodyContent = this.props.itemResults.map((item, index) => {
        return (
         <tr key={item[0]['fieldValue']}>
           {
             item.map((fieldObject, indexFieldObject) => {
               return (
                <td key={indexFieldObject}>
                  {fieldObject['fieldValue']}
                </td>
               )
             })
           }
         </tr>
        )
     });
    }

    return (
      <tbody style={{
        textAlign: 'center'
      }}>
        {tbodyContent || 'Result Empty'}
      </tbody>
    )
  }
}

PanelResults.propTypes = {
  itemResults: PropTypes.array.isRequired,
}

export default PanelResults;
