import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PanelResult from './PanelResults';
import PanelItemType from './PanelItemType';
import PanelFields from './PanelFields';


class Panel extends Component {
  render() { 
    const fields = [];

    this.props.itemResults.length && fields.push.apply(
      fields, this.props.itemResults[0].map(field => {
        return [
          field['fieldId'],
          field['fieldName']
        ];
      })
    )
    
    return (
      <React.Fragment>
        <PanelItemType itemType={this.props.itemType}  />
        <table style={{
          overflow: 'auto',
          height: '400px',
          display: 'block',
          borderSpacing: '6px'
        }}>
          <PanelFields fields={fields} />
          <PanelResult itemResults={this.props.itemResults}/>
        </table>
      </React.Fragment>
    )
  }
}

Panel.propTypes = {
  itemType: PropTypes.string.isRequired,
  itemResults: PropTypes.array.isRequired
}
 
export default Panel;