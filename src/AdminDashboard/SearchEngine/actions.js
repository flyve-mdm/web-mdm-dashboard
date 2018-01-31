// React Actions Pattern
// Separate functions of the SearchEngine Component class 

const setFields = (ctx) => {
  /*
  * Set state for render field in the QueryBuilder component
  * @ctx -> React Component
  * @State Change -> fields
  */

  const fields = [];

  const listSearchOptions = ctx.state.listSearchOptions;

  for (var key in listSearchOptions) {
    if (listSearchOptions.hasOwnProperty(key)) {
      if (listSearchOptions[key]['name'] !== undefined &&
      listSearchOptions[key]['field'] !== undefined) {

        let name = listSearchOptions[key]['name'];

        fields.push({
          'name': name.toLocaleLowerCase(),
          'label': name
        });

      }
    }
  }

  ctx.setState({
    fields: fields
  });
}

const getFieldId = (ctx, fieldName) => {
  /*
  * Get and return id of itemType
  * @ctx -> React Component
  * @fieldName -> Name of the field to search the id, example Manufacturer
  */
  
  let entries = Object.entries(ctx.state.listSearchOptions);
  let id = null;

  entries.forEach((item, index) => {
    var data = item[1];
    if (data.name !== undefined) {
      if (data.name.toLocaleLowerCase() ===  fieldName.toLocaleLowerCase()) {
        id = item[0];
        return false;
      }
    }
  });

  return id; // 23 is Manufacturer
}

const normalizeQuery = (ctx) => {
  /*
  * Process query create by QueryBuilde
  * And normalize for correct format to GLPI REST API URI
  */

  const query = {...ctx.state.query};
  const newArrayQuery = [];

  console.log('[Antes del each] ', query, ctx.state.query)

  let objectCriteria = {};

  // TODO: Make a recursive function 
  query.rules.forEach( (value, index) => {
    if (query.combinator !== undefined ) {
      objectCriteria['link'] = query.combinator
    } 

    objectCriteria['field'] = getFieldId(ctx, value['field']);

    objectCriteria['searchtype'] = value['operator'];

    objectCriteria['value'] = value['value'];

    newArrayQuery.push( objectCriteria );

    objectCriteria = {}
  });

  console.log('[Despues del each] ', newArrayQuery);

  return newArrayQuery;

}

const getTranslation = () => {
  /*
  * Friendly translation for each QueryBuilder input
  */
  return {
    fields: {
        title: "Fields"
    },
    operators: {
        title: "Operators"
    },
    value: {
        title: "Value"
    },
    removeRule: {
        label: "x",
        title: "Remove rule"
    },
    removeGroup: {
        label: "x",
        title: "Remove group"
    },
    addRule: {
        label: "+Rule",
        title: "Add rule"
    },
    addGroup: {
        label: "+Group",
        title: "Add group"
    },
    combinators: {
        title: "Combinators"
    }
  } 
}

module.exports = {
  setFields,
  getTranslation,
  getFieldId,
  normalizeQuery
};