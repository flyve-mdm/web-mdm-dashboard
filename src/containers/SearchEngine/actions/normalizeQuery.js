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
 * Create the array of rules extracted
 * @function recursiveExtractQueryRules
 * @param {object} query
 * @param {array} arrayRulesExtracted
 * @param {string} combinator
 * @return {array}
 */
const recursiveExtractQueryRules = (query, arrayRulesExtracted, combinator) => {
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
      recursiveExtractQueryRules(rule, arrayRulesExtracted, query.combinator)
    })
  }

  return arrayRulesExtracted
}

/**
 * Process query create by QueryBuilde.
 * And normalize for correct format to GLPI REST API URI
 * @function normalizeQuery
 * @param {object} query
 * @return {array}
 */
const normalizeQuery = (query) => {
  const arrayRules = []

  const arrayRulesExtracted = recursiveExtractQueryRules(
    query, arrayRules, query.combinator,
  )

  return arrayRulesExtracted
}

export default normalizeQuery
