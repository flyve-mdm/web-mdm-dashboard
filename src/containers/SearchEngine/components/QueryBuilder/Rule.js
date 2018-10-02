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

import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'components/Forms'
import itemtype from 'shared/itemtype'
import withGLPI from 'hoc/withGLPI'
import createFieldList from '../../actions/createFieldList'

/**
 * Component with the parameters of one query rule
 * @class SearchEngine
 * @extends PureComponent
 */
class Rule extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      fieldList: props.fieldList,
    }
  }

  /**
   * If it is a metacriteria rule, it will update the list of fields
   * @function componentDidMount
   */
  componentDidMount() {
    if (!this.props.field) {
      this.handleChangeRule('itemtype', this.props.itemtype)
    }
  }

  /**
   * Manage the change of values
   * @function handleChangeRule
   * @async
   * @param {string} name
   * @param {string} value
   */
  handleChangeRule = async (name, value) => {
    if (name === 'itemtype') {
      this.props.changeRule(this.props.type, this.props.id, { itemtype: value, field: null })
      const fieldList = createFieldList(await this.props.glpi.listSearchOptions({ itemtype: value }))
      await this.setState({ fieldList })
      this.props.changeRule(this.props.type, this.props.id, { field: fieldList[0].value })
    } else {
      this.props.changeRule(this.props.type, this.props.id, { [name]: value })
    }
  }

  /**
   * Delete the current rule
   * @function deleteRule
   */
  deleteRule = () => {
    this.props.changeRule(this.props.type, this.props.id, null)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="search-engine__rule froms__row">
        <span
          className="iconFont deleteIcon"
          onClick={this.deleteRule}
          role="button"
          tabIndex="0"
        />

        <Select
          name="link"
          value={this.props.link}
          options={[
            { name: 'AND', value: 'AND' },
            { name: 'OR', value: 'OR' },
          ]}
          function={this.handleChangeRule}
          noEmpty
        />

        {
          this.props.itemtype
          && (
            <Select
              name="itemtype"
              value={this.props.itemtype}
              options={Object.keys(itemtype).map(e => ({ name: e, value: e })).sort((a, b) => {
                if (a.name > b.name) {
                  return 1
                }
                if (a.name < b.name) {
                  return -1
                }
                return 0
              })}
              function={this.handleChangeRule}
              noEmpty
            />
          )
        }

        {
          this.props.field
          && (
            <React.Fragment>
              <Select
                name="field"
                value={this.props.field}
                options={this.state.fieldList}
                function={this.handleChangeRule}
                noEmpty
              />

              <Select
                name="searchtype"
                value={this.props.searchtype}
                options={[
                  { name: 'contains', value: 'contains' },
                  { name: 'equals', value: 'equals' },
                  { name: 'notequals', value: 'notequals' },
                  { name: 'lessthan', value: 'lessthan' },
                  { name: 'morethan', value: 'morethan' },
                  { name: 'under', value: 'under' },
                  { name: 'notunder', value: 'notunder' },
                ]}
                function={this.handleChangeRule}
                noEmpty
              />

              <Input
                name="value"
                type="text"
                value={this.props.value}
                function={this.handleChangeRule}
              />
            </React.Fragment>
          )
        }

        {/* <button
          className="btn"
          type="button"
          onClick={this.deleteRule}
        >
         -
        </button> */}


      </div>
    )
  }
}

Rule.defaultProps = {
  itemtype: null,
  fieldList: null,
  field: null,
}

Rule.propTypes = {
  id: PropTypes.number.isRequired,
  itemtype: PropTypes.string,
  field: PropTypes.string,
  fieldList: PropTypes.array,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  searchtype: PropTypes.string.isRequired,
  changeRule: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(Rule)
