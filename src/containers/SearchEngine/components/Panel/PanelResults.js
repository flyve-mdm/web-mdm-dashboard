import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PanelResults extends Component {
  render() { 
    let bodyContent = null

    if (this.props.itemResults) {
      bodyContent = this.props.itemResults.map((item, index) => {
        return (
          <div className="rowContent" key={index}>
           {
             item.map((fieldObject, indexFieldObject) => {
               return (
                 <div className={index % 2 === 0 ? "cellContent" : "cellContent cellContentTwo"} key={indexFieldObject}>
                  {fieldObject['fieldValue']}
                </div>
               )
             })
           }
         </div>
        )
     })
    }

    return bodyContent
  }
}

PanelResults.propTypes = {
  itemResults: PropTypes.array.isRequired,
}

export default PanelResults;
