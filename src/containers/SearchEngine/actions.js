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

// React Actions Pattern
// Separate functions of the SearchEngine Component class 

const setFields = (ctx) => {
    /*
    * Set state for render field in the QueryBuilder component
    * @ctx -> React Component
    * @State Change -> fields
    */

    const fields = []

    const listSearchOptions = ctx.state.listSearchOptions

    for (var key in listSearchOptions) {
        if (listSearchOptions.hasOwnProperty(key)) {
            if (listSearchOptions[key]['name'] !== undefined &&
                listSearchOptions[key]['field'] !== undefined) {

                let name = listSearchOptions[key]['name']
                // let field = listSearchOptions[key]['field']
                fields.push({
                    'name': key,//name.toLocaleLowerCase(),
                    'label': name
                })

            }
        }
    }

    ctx.setState({
        fields: fields
    })
}

// const getFieldId = (ctx, fieldName) => {
//     /*
//     * Get and return id of itemType
//     * @ctx -> React Component
//     * @fieldName -> Name of the field to search the id, example Manufacturer
//     */

//     let entries = Object.entries(ctx.state.listSearchOptions)
//     let id = null

//     entries.forEach((item, index) => {
//         var data = item[1]
//         if (data.name !== undefined) {
//             if (data.name.toLocaleLowerCase() === fieldName.toLocaleLowerCase()) {
//                 id = item[0]
//                 return false
//             }
//         }
//     })

//     return id
// }

const normalizeRule = (ctx, rule) => {
    /*
     * Normalize keys of rule object
     * */
    let objectCriteria = { 
        field: Number(rule['field']), 
        searchtype: rule['operator'], 
        value: rule['value']
    }

    return objectCriteria
}

const recursiveExtractQueryRules = (query, ctx, arrayRulesExtracted, combinator) => {

    if (typeof (query.rules) === undefined || typeof (query.field) === "string") {
        /*
         * It means that it is a rule, and it has operator, value and field
         * */
        arrayRulesExtracted.push({
            link: combinator, // 'AND' or 'OR'
            ...normalizeRule(ctx, query)
        })
    } else {
        /*
         * It means that it is a group and you have rules and combinator
         * */
        query.rules.forEach((rule) => {
            recursiveExtractQueryRules(rule, ctx, arrayRulesExtracted, query.combinator)
        })
    }

    return arrayRulesExtracted
}

const normalizeQuery = (ctx) => {
    /*
    * Process query create by QueryBuilde
    * And normalize for correct format to GLPI REST API URI
    */
    const query = { ...ctx.state.query }
    const arrayRules = []

    const arrayRulesExtracted = recursiveExtractQueryRules(
        query, ctx, arrayRules, query.combinator
    )

    return arrayRulesExtracted
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
    normalizeQuery
}