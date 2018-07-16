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
import I18n from '../../../../../shared/i18n'
import itemtype from '../../../../../shared/itemtype'
import Loading from '../../../../../components/Loading'
import EmptyMessage from '../../../../../components/EmptyMessage'
import {
  Input,
  TextArea,
} from '../../../../../components/Forms'
import toDateInputValue from '../../../../../shared/toDateInputValue'
import validateData from '../../../../../shared/validateData'

/**
 * @class Applications
 * @extends PureComponent
 */
export default class Applications extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      software: undefined,
    }
  }

  componentDidMount = async () => {
    const {
      glpi,
      id,
    } = this.props

    try {
      const software = await glpi.getAnItem({
        id,
        itemtype: itemtype.Software,
      })
      this.setState({
        software,
        isLoading: false,
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
        displayErrorPage: false,
      }))
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const {
      isLoading,
      software,
    } = this.state
    const {
      id,
      selectApplication,
    } = this.props

    return (
      isLoading
        ? <Loading message={`${I18n.t('commons.loading')}...`} />
        : (
          software
            ? (
              <React.Fragment>
                <h3>
                  {`${I18n.t('commons.application')} ${id}`}
                </h3>
                <Input
                  label={I18n.t('commons.name')}
                  name="name"
                  type="text"
                  value={validateData(software.name)}
                  disabled
                />
                <Input
                  label={I18n.t('commons.date_creation')}
                  name="comment"
                  type="date"
                  value={validateData(toDateInputValue(software.date_creation))}
                  disabled
                />
                <Input
                  label={I18n.t('commons.date_mod')}
                  name="comment"
                  type="date"
                  value={validateData(toDateInputValue(software.date_mod))}
                  disabled
                />
                <TextArea
                  label={I18n.t('commons.comments')}
                  name="comment"
                  type="textArea"
                  value={validateData(software.comment)}
                  disabled
                />
                <button
                  className="btn btn--secondary"
                  onClick={() => {
                    selectApplication(undefined)
                  }}
                  type="button"
                >
                  {I18n.t('commons.back')}
                </button>
              </React.Fragment>
            )
            : (
              <EmptyMessage message={I18n.t('commons.problems_loading_data')} />
            )
        )
    )
  }
}
/** Applications propTypes */
Applications.propTypes = {
  id: PropTypes.number.isRequired,
  glpi: PropTypes.object.isRequired,
  selectApplication: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}
