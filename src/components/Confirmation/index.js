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
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react'
import I18n from 'shared/i18n'

/**
 * Component with a dialogue box
 * @class Confirmation
 * @extends PureComponent
 */
class Confirmation extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      hideDialog: this.props.hideDialog,
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      hideDialog: nextProps.hideDialog,
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <Dialog
        hidden={this.state.hideDialog}
        onDismiss={(this.props.dismiss || this.props.cancel)}
        dialogContentProps={{
          type: DialogType.normal,
          title: this.props.title,
          subText: this.props.message,
        }}
      >
        {null /** You can also include null values as the result of conditionals */}
        <DialogFooter>
          <PrimaryButton
            onClick={this.props.isOK}
            text={I18n.t('commons.ok')}
          />
          <DefaultButton
            onClick={this.props.cancel}
            text={I18n.t('commons.cancel')}
          />
        </DialogFooter>
      </Dialog>
    )
  }
}

Confirmation.defaultProps = {
  dismiss: null,
}

Confirmation.propTypes = {
  hideDialog: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isOK: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  dismiss: PropTypes.func,
}

export default Confirmation
