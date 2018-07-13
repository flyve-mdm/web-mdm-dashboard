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
import ApplicationsList from './components/ApplicationsList'
import getMode from '../../shared/getMode'
import withGLPI from '../../hoc/withGLPI'
import calc100PercentMinus from '../../shared/calc100PercentMinus'
import GenerateRoutes from '../../components/GenerateRoutes'
import routes from './routes'
import publicURL from '../../shared/publicURL'

/**
 * @class Applications
 * @extends PureComponent
 */
class Applications extends PureComponent {
  /** @constructs */
  constructor(props) {
    super(props)
    this.state = {
      icon: 'switchAppsIcon',
      mode: getMode(),
      itemListPaneWidth: getMode() === 'small' ? '100%' : 320,
      selectionMode: false,
      action: null,
      selectedItems: [],
    }

    window.addEventListener('resize', this.handleResize)
  }

  /**
   * Remove 'resize' event listener
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.history.location.pathname === `${publicURL}/app/applications` && prevState.selectedItems.length > 0 && prevState.selectionMode === false) {
      return {
        ...prevState,
        selectedItems: [],
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle page resize
   * @function handleResize
   */
  handleResize = () => {
    const nextMode = getMode()

    if (nextMode === 'small') {
      this.setState({
        itemListPaneWidth: '100%',
      })
    } else {
      this.setState({
        itemListPaneWidth: 320,
      })
    }

    if (this.state.mode !== nextMode) {
      this.setState({
        mode: nextMode,
      })
    }
  }

  /**
   * Build props
   * @function propsData
   * @returns {object}
   */
  propsData = () => ({
    icon: this.state.icon,
    selectionMode: this.state.selectionMode,
    selectedItems: this.state.selectedItems,
    action: this.state.action,
    history: this.props.history,
    glpi: this.props.glpi,
    handleMessage: this.props.handleMessage,
    changeSelectionMode: this.changeSelectionMode,
    changeSelectedItems: this.changeSelectedItems,
    changeAction: this.changeAction,
    toast: this.props.toast,
  })

  /**
   * Change selected items
   * @function changeSelectedItems
   */
  changeSelectedItems = selectedItems => this.setState({
    selectedItems,
  })

  /**
   * Change action
   * @function changeAction
   */
  changeAction = action => this.setState({
    action,
  })

  /**
   * Change selection mode
   * @function changeSelectionMode
   */
  changeSelectionMode = selectionMode => this.setState({
    selectionMode,
  })

  /**
   * Build list styles
   * @function stylesList
   * @returns {object}
   */
  stylesList = () => {
    const styles = {
      width: this.state.itemListPaneWidth,
    }

    if (this.state.mode === 'small') {
      if ((this.state.selectedItems.length === 0 && this.props.history.location.pathname
          === `${publicURL}/app/applications`)
        || this.props.history.location.pathname === `${publicURL}/app/applications`
        || (this.props.history.location.pathname === `${publicURL}/app/applications`
          && this.state.selectionMode)) {
        styles.display = 'inline-block'
      } else {
        styles.display = 'none'
      }
    } else {
      styles.display = 'inline-block'
    }

    return styles
  }

  /**
   * Build content styles
   * @function stylesContent
   * @returns {object}
   */
  stylesContent = () => {
    const validWidth = this.state.itemListPaneWidth === '100%' ? 0 : this.state.itemListPaneWidth
    const styles = {
      width: calc100PercentMinus(validWidth),
      height: '100%',
    }

    if (this.state.mode === 'small') {
      if (
        (this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/applications`)
        || (this.props.history.location.pathname === `${publicURL}/app/applications`)
        || (
          (this.props.history.location.pathname === `${publicURL}/app/applications`)
          && this.state.selectionMode
        )
      ) {
        styles.display = 'none'
      } else {
        styles.display = 'inline-flex'
      }
    } else {
      styles.display = 'inline-flex'
    }

    return styles
  }

  render() {
    const renderComponents = (
      <React.Fragment>
        <div className="list-pane flex-block__list" style={{ ...this.stylesList() }}>
          <ApplicationsList
            key="list"
            {...this.propsData()}
          />
        </div>
        <div className="flex-block__content" style={{ ...this.stylesContent() }}>
          <GenerateRoutes
            key="content"
            routes={routes}
            rootPath={this.props.match.url}
            {...this.propsData()}
          />
        </div>
      </React.Fragment>
    )

    return (
      <div className="flex-block flex-block--with-scroll">
        {renderComponents}
      </div>
    )
  }
}

/** Applications propTypes */
Applications.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withGLPI(Applications)
