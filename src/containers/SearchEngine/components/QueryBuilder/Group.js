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
import I18n from 'shared/i18n'
import Rule from './Rule'
import SubGroup from './SubGroup'

class Group extends PureComponent {
  getRules(rules) {
    const render = []
    rules.forEach((rule, index) => {
      if (!rule.criteria && !rule.metacriteria) {
        if (!rule.itemtype) {
          render.push(this.selectRule('criteria', rule, index))
        } else {
          render.push(this.selectRule('metacriteria', rule, index))
        }
      } else {
        render.push(
          <SubGroup
            key={`group-${index.toString()}`}
            index={[index]}
            rule={rule}
            changeRule={this.props.changeRule}
            fieldList={this.props.fieldList}
            addGroup={this.props.addGroup}
          />,
        )
      }
    })

    return render
  }

  selectRule(type, rule, index) {
    if (type === 'criteria') {
      return (
        <Rule
          key={`criteria-${index.toString()}`}
          id={[index]}
          type="criteria"
          changeRule={this.props.changeRule}
          fieldList={this.props.fieldList}
          {...rule}
        />
      )
    }

    return (
      <Rule
        key={`metacriteria-${index.toString()}`}
        id={[index]}
        type="metacriteria"
        changeRule={this.props.changeRule}
        {...rule}
      />
    )
  }

  render() {
    return (
      <div className="search-engine__group">
        {this.getRules(this.props.rules)}
        <button
          className="btn btn--secondary"
          type="button"
          onClick={() => this.props.addGroup()}
        >
          +
          {' '}
          {I18n.t('search_engine.group')}
        </button>
      </div>
    )
  }
}

Group.defaultProps = {
  rules: [],
  index: [],
}

Group.propTypes = {
  index: PropTypes.array,
  rules: PropTypes.array,
  changeRule: PropTypes.func.isRequired,
  fieldList: PropTypes.array.isRequired,
  addGroup: PropTypes.func.isRequired,
}

export default Group
