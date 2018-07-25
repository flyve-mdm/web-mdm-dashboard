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

/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import QueryBuilder from 'react-querybuilder'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'

/**
 * Componente with the query builder
 * @class SearchQueryBuilder
 * @extends PureComponent
 */
class SearchQueryBuilder extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="queryBuilder">
        <QueryBuilder
          fields={this.props.fields}
          operators={[
            { name: 'contains', label: I18n.t('commons.contains') },
            { name: 'equal', label: I18n.t('commons.equals') }, // equal instead equals because work it
            { name: 'notequals', label: I18n.t('commons.not_equals') },
            { name: 'lessthan', label: I18n.t('commons.less_than') },
            { name: 'morethan', label: I18n.t('commons.more_than') },
            { name: 'under', label: I18n.t('commons.under') },
            { name: 'notunder', label: I18n.t('commons.not_under') },
          ]}
          onQueryChange={this.props.handleChangeQuery}
        />
      </div>
    )
  }
}

SearchQueryBuilder.propTypes = {
  fields: PropTypes.array.isRequired,
  handleChangeQuery: PropTypes.func.isRequired,
}


export default SearchQueryBuilder
