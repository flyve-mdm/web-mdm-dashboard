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
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import Loader from '../../../../components/Loader'

/**
 * @class Inventory
 * @extends PureComponent
 */
export default class Inventory extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      isLoading: false
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  /**
   * handle request refresh inventory
   * @function handleRefresh
   * */
  handleRefresh = () => {
    this.setState({
      isLoading: true
    }, async () => {
      try {
        const data = await this.props.glpi.getAnItem({
          itemtype: this.props.itemType,
          id: this.props.itemID,
          queryString: this.props.parameters
        })
        let object = Object.keys(this.props.fields).map((key, index) => {
          return {
            [this.props.fields[key]]: data[key]
          }
        })
        this.setState({
          isLoading: false,
          data: object
        })
      } catch (error) {
        this.setState({
          isLoading: false,
          data: undefined
        })
      }
    })
  }

  /**
   * handle build inventory list
   * @function buildList
   * @param {object} value
   */
  buildList = (value) => {
    return Object.keys(value).map((element, index) => {
      return (
        <div style={{padding:'20px'}}>
          <Loader type="content"/>
        </div>
      )
    })
  }

  render() {
    if (this.state.isLoading && !this.state.data) {
      return (
        <div style={{padding:'20px'}}>
          <Loader type="content"/>
        </div>
      )
    } else if (!this.state.isLoading && this.state.data) {
      return (
        <div>
          <div className="title">{this.props.title}</div>
          {
            this.state.data.map((value, index) => {
              return (this.buildList(value))
            })
          }
        </div>
      )
    } else {
      return (null)
    }
  }
}
/** Inventory defaultProps */
Inventory.defaultProps = {
  parameters: {}
}
/** Inventory propTypes */
Inventory.propTypes = {
  title: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  itemID: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  parameters: PropTypes.object,
  glpi: PropTypes.object.isRequired
}
