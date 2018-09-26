/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */


/**
 * Returns the fields to use in the QueryBuilder component
 * @function getFields
 * @param {object} listSearchOptions
 */
function getFields(listSearchOptions) {
  const fields = []

  for (const key in listSearchOptions) {
    if (Object.prototype.hasOwnProperty.call(listSearchOptions, key)) {
      const { name, field } = listSearchOptions[key]

      if (name !== undefined && field !== undefined) {
        fields.push({
          name: key,
          label: name,
        })
      }
    }
  }

  return fields
}

/**
 * Create the array of rules extracted
 * @function recursiveExtractQueryRules
 * @param {object} query
 * @param {object} ctx
 * @param {array} arrayRulesExtracted
 * @param {string} combinator
 * @return {array}
 */
const recursiveExtractQueryRules = (query, ctx, arrayRulesExtracted, combinator) => {
  if (typeof (query.rules) === 'undefined' || typeof (query.field) === 'string') {
    /*
     * It means that it is a rule, and it has operator, value and field
     */
    arrayRulesExtracted.push({
      link: combinator, // 'AND' or 'OR'
      field: Number(query.field),
      searchtype: query.operator,
      value: query.value,
    })
  } else {
    /*
     * It means that it is a group and you have rules and combinator
     */
    query.rules.forEach((rule) => {
      recursiveExtractQueryRules(rule, ctx, arrayRulesExtracted, query.combinator)
    })
  }

  return arrayRulesExtracted
}

/**
 * Process query create by QueryBuilde.
 * And normalize for correct format to GLPI REST API URI
 * @function normalizeQuery
 * @param {object} ctx
 * @return {array}
 */
const normalizeQuery = (ctx) => {
  const query = { ...ctx.state.query }
  const arrayRules = []

  const arrayRulesExtracted = recursiveExtractQueryRules(
    query, ctx, arrayRules, query.combinator,
  )

  return arrayRulesExtracted
}

/**
 * Friendly translation for each QueryBuilder input
 * @function getTranslation
 * @return {object}
 */
const getTranslation = () => ({
  fields: {
    title: 'Fields',
  },
  operators: {
    title: 'Operators',
  },
  value: {
    title: 'Value',
  },
  removeRule: {
    label: 'x',
    title: 'Remove rule',
  },
  removeGroup: {
    label: 'x',
    title: 'Remove group',
  },
  addRule: {
    label: '+Rule',
    title: 'Add rule',
  },
  addGroup: {
    label: '+Group',
    title: 'Add group',
  },
  combinators: {
    title: 'Combinators',
  },
})

module.exports = {
  getTranslation,
  normalizeQuery,
  getFields,
}
