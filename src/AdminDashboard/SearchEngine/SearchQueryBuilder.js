import React, { Component } from 'react';
import QueryBuilder from 'react-querybuilder';
import PropTypes from 'prop-types';


class SearchQueryBuilder extends Component {
  render() { 
    return (
      <QueryBuilder
        fields={this.props.fields}
        operators={[
          {name: 'contains', label: 'Contains'},
          {name: 'equal', label: 'Equals'}, // equal instead equals because work it
          {name: 'notequals', label: 'Not equals'},
          {name: 'lessthan', label: 'Less Than'},
          {name: 'morethan', label: 'More Than'},
          {name: 'under', label: 'Under'},
          {name: 'notunder', label: 'Not Under'}
        ]}
        onQueryChange={this.props.handleChangeQuery}/>
    )
  }
}

SearchQueryBuilder.propTypes = {
  fields: PropTypes.array.isRequired,
  handleChangeQuery: PropTypes.func.isRequired
}

 
export default SearchQueryBuilder;