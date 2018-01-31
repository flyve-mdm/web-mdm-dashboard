import React, { Component } from 'react';
import GlpiApi from '../../Utils/GlpiApi';
import SearchQueryBuilder from './SearchQueryBuilder';
import Panel from './Panel/Panel';

import { setFields, getTranslation, normalizeQuery } from './actions';

import computerOptions from './computerOptions.json';


class SearchEngine extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: null,
      itemType: 'computer',
      itemResults: [],
      fields: [] // -> {name: 'name', label: 'Name'},
    }

    this.translations = getTranslation(); // Friendly translations of each QueryBuilder input
    
    this.setFields = () => setFields(this);
    this.normalizeQuery = () => normalizeQuery(this);
  }

  componentDidMount() {
    /*
    * Simulation of searchOptions fetch response
    */
    setTimeout( () => {
      this.setState({ listSearchOptions: computerOptions }, () => {
        this.setFields();
      });
    }, 1000 )
  }

  handleChangeQuery = (query) => {
    /*
    * Update the query state each time that the QueryBuilde query change 
    */
    this.setState({ query: query });
  }

  handleOnSearch = () => {
    /*
    * Handle click event in the search button
    */
    
    GlpiApi.searchItems('computer', this.normalizeQuery()).then( 
       value => {
      this.setState({itemResults: value.data})
    }, reason => {
      console.log(reason)
    });

  }

  render() {
    let styles = {
      backgroundColor: '#E1E1E1',
      padding: '15px'
    }

    // Create Array of objects with the result of the search
    // Field name instead the field id
    const arrayResultsWithFields = [];

    this.state.itemResults && this.state.itemResults.forEach( (result, index) => {
      let arrayResult = []
      let arrayOfArraysIdAndData = Object.entries(result);

      arrayOfArraysIdAndData.forEach( (field, indexField) => {
        let objectField = {}

        objectField['fieldName'] = this.state.listSearchOptions[field[0]]['name'];
        objectField['fieldValue'] = field[1];

        arrayResult.push( objectField )

      });

      arrayResultsWithFields.push( arrayResult )
    });

    return (
      <div style={styles}>

        <h1>Search Engine</h1>

        {this.state.fields.length > 0 &&
          <SearchQueryBuilder
          fields={this.state.fields}
          handleChangeQuery={this.handleChangeQuery}
          translations={this.translations}/>
        }     

        {this.state.query
          ? this.state.query.rules.length 
            ? <button onClick={this.handleOnSearch}> Search </button>
            : <p>Add Rule</p>
          : <p>Loading  ... </p>}

        <Panel
          itemType={this.state.itemType}
          itemResults={arrayResultsWithFields}
          itemFields={this.state.fields}/>
      </div>
    )
  }
}


export default SearchEngine;