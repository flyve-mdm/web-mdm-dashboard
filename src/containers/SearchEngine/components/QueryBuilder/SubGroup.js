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

class SubGroup extends PureComponent {
  static getRules(rule) {
    return (rule.criteria || rule.metacriteria)
  }

  selectRule(type, rule, index) {
    if (type === 'criteria') {
      return (
        <Rule
          key={`criteria-${index.toString()}`}
          id={index}
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
        id={index}
        type="metacriteria"
        changeRule={this.props.changeRule}
        {...rule}
      />
    )
  }

  render() {
    const render = []
    const rules = SubGroup.getRules(this.props.rule)

    rules.forEach((rule, index) => {
      if (!rule.criteria && !rule.metacriteria) {
        if (!rule.itemtype) {
          render.push(
            this.selectRule(
              'criteria',
              rule,
              [...this.props.index, 'criteria', index],
            ),
          )
        } else {
          render.push(
            this.selectRule(
              'metacriteria',
              rule,
              [...this.props.index, 'metacriteria', index],
            ),
          )
        }
      } else {
        render.push(
          <SubGroup
            key={`group-${index.toString()}`}
            index={[...this.props.index, index]}
            rule={rule}
            changeRule={this.props.changeRule}
            fieldList={this.props.fieldList}
          />,
        )
      }
    })

    return (
      <div className="search-engine__group">
        { render }
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

SubGroup.defaultProps = {
  index: [],
}

SubGroup.propTypes = {
  index: PropTypes.array,
  rule: PropTypes.object.isRequired,
  changeRule: PropTypes.func.isRequired,
  fieldList: PropTypes.array.isRequired,
  addGroup: PropTypes.func.isRequired,
}

export default SubGroup
