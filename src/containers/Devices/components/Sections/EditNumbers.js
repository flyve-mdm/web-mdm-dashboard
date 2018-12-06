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
import { Input } from 'components/Forms'
import EmptyMessage from 'components/EmptyMessage'

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

    this.deleteNumbers = []
  }

  deleteNumber = (index) => {
    this.deleteNumbers.push(this.state.numbers[index].id)

    this.setState(prevState => ({
      numbers: prevState.numbers.slice(0, index).concat(prevState.numbers.slice(index + 1)),
    }))
  }

  addNewNumber = () => {
    this.setState(prevState => ({
      numbers: [
        ...prevState.numbers,
        {
          id: 0,
          value: '',
        },
      ],
    }))
  }

  changeNumber = (index, value) => {
    const myPhoneRegex = /^[0-9-+s()]*$/i
    if (myPhoneRegex.test(value)) {
      this.setState((prevState) => {
        const newValue = [...prevState.numbers]
        newValue[index].value = value

        return ({
          numbers: newValue,
        })
      })
    }
  }

  render() {
    return (
      <form
        style={{ paddingLeft: 20 }}
        onSubmit={(e) => {
          e.preventDefault()
          this.props.save(this.state.numbers, this.deleteNumbers)
        }}
      >
        <h3>
          {I18n.t('commons.edit_numbers')}
        </h3>
        {
          this.state.numbers.map((number, index) => (
            <div>
              <Input
                type="text"
                name={index}
                value={number.value}
                className="win-textbox"
                function={this.changeNumber}
                delete={this.deleteNumber}
                key={`number-${index.toString()}`}
                required
              />
            </div>
          ))
        }
        {
          this.state.numbers.length === 0 && (
            <EmptyMessage
              message={I18n.t('commons.not_available')}
              style={{ margin: '20px 0' }}
            />
          )
        }
        <button
          className="btn btn--secondary"
          style={{ marginBottom: 10 }}
          onClick={this.addNewNumber}
          type="button"
        >
          {`+ ${I18n.t('commons.add')}`}
        </button>

        <div>
          <button
            className="btn btn--secondary"
            style={{ marginRight: 10 }}
            onClick={() => this.props.cancel()}
            type="button"
          >
            {I18n.t('commons.cancel')}
          </button>

          <button
            className="btn btn--primary"
            type="submit"
          >
            {I18n.t('commons.save')}
          </button>
        </div>
      </form>
    )
  }
}

/** EditNumbers propTypes */
EditNumbers.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
}
