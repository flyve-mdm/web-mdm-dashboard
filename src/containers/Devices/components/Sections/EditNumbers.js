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
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'

/**
 * @class EditNumbers
 * @extends PureComponent
 */
export default class EditNumbers extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      numbers: this.props.numbers,
    }
  }

  changeNumber(index, value) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newValue = [...this.state.numbers]
    newValue[index] = value

    this.setState({
      numbers: newValue,
    })
  }

  render() {
    return (
      <div style={{ paddingLeft: 20 }}>
        <h3>
          {I18n.t('commons.edit_numbers')}
        </h3>
        {
          this.state.numbers.map((number, index) => (
            <div>
              <input
                type="text"
                name={index}
                value={number}
                className="win-textbox"
                onChange={e => this.changeNumber(e.target.name, e.target.value)}
                key={`number-${index.toString()}`}
              />
            </div>
          ))
        }
        <button
          className="btn btn--secondary"
          style={{ marginRight: 10 }}
          onClick={() => this.props.save(this.state.numbers)}
          type="button"
        >
          {I18n.t('commons.cancel')}
        </button>

        <button
          className="btn btn--primary"
          onClick={() => this.props.save(this.state.numbers)}
          type="button"
        >
          {I18n.t('commons.save')}
        </button>
      </div>
    )
  }
}

/** EditNumbers propTypes */
EditNumbers.propTypes = {
  save: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
}
