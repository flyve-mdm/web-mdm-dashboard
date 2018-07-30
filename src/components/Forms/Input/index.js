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
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'
import Confirmation from 'components/Confirmation'
import ErrorValidation from 'components/ErrorValidation'

/**
 * Component to create a custom input
 * @class Input
 * @extends PureComponent
 */
class Input extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isCorrect: true,
      errors: [],
      className: 'win-textbox',
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isCorrect || nextProps.forceValidation) {
      if (nextProps.parametersToEvaluate) {
        const validation = ErrorValidation.validation(nextProps.parametersToEvaluate, nextProps.value)
        return {
          isCorrect: validation.isCorrect,
          errors: validation.errors,
          className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input',
        }
      }
      return {
        ...prevState,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (eventObject) => {
    this.props.function(this.props.name, eventObject.target.value)
  }

  /**
   * Validate if the entered data are valid
   * @function validate
   * @param {object} parametersToEvaluate
   * @param {string} value
   */
  validate = (parametersToEvaluate, value) => {
    if (parametersToEvaluate) {
      const validation = ErrorValidation.validation(parametersToEvaluate, value)

      this.setState({
        isCorrect: validation.isCorrect,
        errors: validation.errors,
        className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input',
      })
    }
  }

  /**
   * Delete an email of the list
   * @async
   * @function deleteEmail
   */
  deleteEmail = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) this.props.delete(this.props.name)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const deleteIcon = this.props.delete
      ? (
        <Icon
          iconName="Delete"
          style={{ margin: 10, fontSize: 18 }}
          onClick={this.deleteEmail}
        />
      )
      : undefined
    return (
      <div className="froms__col">
        <p>
          {this.props.label}
        </p>
        <input
          type={this.props.type}
          className={this.state.className}
          name={`${this.props.type}-${this.props.name}`}
          value={(this.props.value || '')}
          placeholder={this.props.placeholder}
          onChange={this.change}
          onBlur={() => this.validate(this.props.parametersToEvaluate, this.props.value)}
          disabled={this.props.disabled}
          style={this.props.style}
          ref={this.props.inputRef}
          required={this.props.required}
        />
        <ErrorValidation errors={this.state.errors} />
        { deleteIcon }
        {
          this.props.delete
            ? (
              <Confirmation
                title={`${I18n.t('commons.delete')} ${this.props.label}`}
                message={this.props.value}
                reference={(el) => { this.contentDialog = el }}
              />
            )
            : <span />
        }
      </div>
    )
  }
}

Input.defaultProps = {
  label: '',
  value: '',
  type: 'text',
  required: false,
  placeholder: null,
  function: () => {},
  disabled: false,
  style: {},
  inputRef: () => { },
  delete: null,
  parametersToEvaluate: null,
  forceValidation: false,
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  function: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  inputRef: PropTypes.func,
  delete: PropTypes.func,
  parametersToEvaluate: PropTypes.object,
  // eslint-disable-next-line
  forceValidation: PropTypes.bool,
  required: PropTypes.bool,
}

export default Input
