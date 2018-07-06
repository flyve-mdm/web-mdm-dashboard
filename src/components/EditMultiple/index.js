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
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../ContentPane'
import Loading from '../Loading'
import {
  Select,
  Input,
  DatePicker,
  TextArea
} from '../Forms'
import ErrorValidation from '../ErrorValidation'
import EmptyMessage from '../EmptyMessage'
import I18n from '../../shared/i18n'

/**
 * Component with the menu for multiple edition
 * @class EditMultiple
 * @extends PureComponent
 */
class EditMultiple extends PureComponent {

  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      itemListEdit: [...this.props.selectedItems],
      isLoading: false,
      selectedField: {},
      newValue: '',
      passwordConfirmation: '',
      passwordConfiguration: {},
      forceValidation: false
    }
  }

  /**
   * Save the new values in glpi
   * @async
   * @function handleSave
   */
  handleSave = async () => {
    let isCorrect = true

    if (this.state.selectedField.type === "password") {
      if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.newValue).isCorrect)
        isCorrect = false

      if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.passwordConfirmation).isCorrect)
        isCorrect = false
    }

    if (isCorrect) {
      this.setState({
        isLoading: true
      }, async () => {
        let input = this.state.selectedField.DBName !== "password" ? {
          [this.state.selectedField.DBName]:
            (this.state.newValue === "true") ?
            true : (this.state.newValue === "false") ?
            false : this.state.newValue
        } : {
          [this.state.selectedField.DBName[0]]: this.state.newValue,
          [this.state.selectedField.DBName[1]]: this.state.passwordConfirmation
        }

        input = this.props.selectedItems.map(element => {
          return ({
            id: element[this.props.request.id],
            ...input
          })
        })

        try {
          await this.props.glpi.updateItem({
            itemtype: this.props.request.itemtype,
            input
          })
          this.setState({
            isLoading: false
          })
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.elements_successfully_edited'),
            type: 'success'
          })
          this.props.history.goBack()
          this.props.changeAction('reload')
          this.props.changeSelectionMode(false)
        } catch (error) {
          this.setState({
            isLoading: false
          })
          this.props.toast.setNotification(handleMessage({type: 'alert', message: error}))
        }
      })
    } else {
      this.setState({
        forceValidation: true
      })
    }
  }

  /**
   * Change state and request the password configuration
   * @function change
   * @param {string} name
   * @param {string} value
   */
  change = (name, value) => {
    if (name === "selectedField") {
      this.setState({
        newValue: '',
        selectedField: JSON.parse(value)
      }, () => {
        if (value === "password") {
          this.setState({
            isLoading: true
          }, async () => {
            const {
              cfg_glpi
            } = await this.props.glpi.getGlpiConfig()
            this.setState({
              passwordConfiguration: {
                minimunLength: cfg_glpi.password_min_length,
                needDigit: cfg_glpi.password_need_number,
                needLowercaseCharacter: cfg_glpi.password_need_letter,
                needUppercaseCharacter: cfg_glpi.password_need_caps,
                needSymbol: cfg_glpi.password_need_symbol
              },
              isLoading: false
            })
          })
        }
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  /**
   * Leave the screen
   * @function cancel
   */
  cancel = () => {
    this.props.history.goBack()
    this.props.changeAction('reload')
    this.props.changeSelectionMode(false)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    if (this.props.selectedItems) {
      let renderComponent
      if (this.state.isLoading) {
        renderComponent = (
          <div style={{marginTop: 40}}>
            <Loading message={`${I18n.t('commons.loading')}...`} />
          </div>
        )
      } else {
        let input

        switch (this.state.selectedField.type) {
          case "text":
            input = (
              <Input
                label={I18n.t('edit_multiple.what_new_value')}
                type="text"
                name="newValue"
                value={this.state.newValue}
                function={this.change}
              />
            )
            break

          case "password":
            input = [
              <Input
                label={I18n.t('edit_multiple.what_new_password')}
                type="password"
                name="newValue"
                value={this.state.newValue}
                parametersToEvaluate={this.state.passwordConfiguration}
                function={this.change}
                forceValidation={this.state.forceValidation}
                key="password-1"
              />,
              <Input
                label={I18n.t('edit_multiple.repeat_password')}
                type="password"
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                parametersToEvaluate={{
                  ...this.state.passwordConfiguration,
                  isEqualTo: {
                    value: this.state.newValue,
                    message: "Passwords do not match"
                  }
                }}
                function={this.change}
                forceValidation={this.state.forceValidation}
                key="password-2"
              />
            ]
            break

          case 'select':
            if (this.state.selectedField.options) {
              input = (
                <Select
                  label= {I18n.t('edit_multiple.what_new_value')}
                  name="newValue"
                  value={this.state.newValue}
                  options={this.state.selectedField.options}
                  function={this.change}
                />
              )
            } else {
              input = (
                <Select
                  label= {I18n.t('edit_multiple.what_new_value')}
                  name="newValue"
                  value={this.state.newValue}
                  options={[]}
                  function={this.change}
                  glpi={this.props.glpi}
                  request={{
                    params: this.state.selectedField.params,
                    method: this.state.selectedField.method,
                    content: this.state.selectedField.content,
                    value: this.state.selectedField.value
                  }}
                />
              )
            }
            break

          case 'datePicker':
            input = (
              <DatePicker
                label={I18n.t('edit_multiple.what_new_value')}
                name="newValue"
                value={this.state.newValue}
                function={this.change}
              />
            )
            break

          case 'textArea':
            input = (
              <TextArea
                label={I18n.t('edit_multiple.what_new_value')}
                type="text"
                name="newValue"
                value={this.state.newValue}
                function={this.change}
              />
            )
            break

          default:
            break
        }
        renderComponent = (
          <div>
            {input}
          </div>
        )
      }

      return (
        <ContentPane>
          <div className="content-header" style={{ margin: '0 10px' }}>
            <h2 className="content-header__title">
              {I18n.t('edit_multiple.title')}
            </h2>
            <h4>
              {I18n.t('edit_multiple.select_field')}
            </h4>
            <Select
              name="selectedField"
              value={this.state.field}
              options={this.props.FieldList.map(field => { return { name: field.name, value: JSON.stringify(field) }})}
              function={this.change}
            />

            {renderComponent}

            {
              this.state.isLoading ?
                ""
                : (
                  <React.Fragment>
                    <br/>

                    <button className="btn btn--secondary" onClick={this.cancel}>
                      {I18n.t('commons.cancel')}
                    </button>

                    <button className="btn btn--primary" onClick={this.handleSave} style={{marginLeft: 10}}>
                      {I18n.t('commons.save')}
                    </button>
                  </React.Fragment>
                )
            }
          </div>
        </ContentPane>
      )
    } else {
      return (
        <EmptyMessage message={I18n.t('commons.no_selection')}/>
      )
    }
  }
}

EditMultiple.propTypes = {
  selectedItems: PropTypes.array,
  FieldList: PropTypes.array.isRequired,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired
}

export default EditMultiple
