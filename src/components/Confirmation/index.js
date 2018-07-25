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
import ReactWinJS from 'react-winjs'
import I18n from 'shared/i18n'

/**
 * Component with a dialogue box
 * @class Confirmation
 * @extends PureComponent
 */
class Confirmation extends PureComponent {
  /**
   * Asynchronous function that waits for a user's response
   * @static
   * @async
   * @function isOK
   * @param {object} contentDialog
   * @return {boolean} User's response
   */
  static isOK = async contentDialog => contentDialog.winControl.show().then(({
    result,
  }) => result === 'primary')

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <ReactWinJS.ContentDialog
        ref={this.props.reference}
        title={this.props.title}
        primaryCommandText={I18n.t('commons.ok')}
        secondaryCommandText={I18n.t('commons.cancel')}
      >
        <p>
          { this.props.message }
        </p>
      </ReactWinJS.ContentDialog>
    )
  }
}

Confirmation.propTypes = {
  reference: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Confirmation
