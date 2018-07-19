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

/**
 * Component to get the icons for the lists
 * @class IconItemList
 * @extends PureComponent
 */
class IconItemList extends PureComponent {
  /**
   * Convert arraybuffer to base64
   * @param {*} buffer
   * @return {string}
   */
  static arrayBufferToBase64(buffer) {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => {
      binary += String.fromCharCode(b)
    })
    return window.btoa(binary)
  }

  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      image: this.props.type !== 'file' || this.props.image === '' ? this.props.image : '',
    }
  }

  /**
   * Request an image if it's necessary
   * @function componentDidMount
   */
  componentDidMount() {
    if (this.props.type === 'file' && this.props.image !== '') {
      this.getImage()
    }
  }

  /**
   * Update the preview of the image
   * @function componentDidUpdate
   */
  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      // eslint-disable-next-line
      this.setState({
        image: this.props.image,
      })
    }
  }

  /**
   * Asynchronous function to get a requested image
   * @async
   * @function getImage
   */
  getImage = async () => {
    try {
      switch (this.props.image) {
        case 'profile.png':
        case 'android.png':
        case 'apple.png':
        case 'Phone.png':
          this.setState({
            // eslint-disable-next-line
            image: require(`../../assets/images/${this.props.image}`),
          })
          break

        default:
          this.requestImage()
          break
      }
    } catch (error) {}
  }

  requestImage = async () => {
    const urlBase = localStorage.getItem('baseURL')
    let url
    if (this.props.isMin) {
      const image = this.props.image.split('.')
      url = `//${urlBase.split('//')[1]}/front/document.send.php?file=_pictures/${image[0]}_min.${image[1]}`
    } else {
      url = `//${urlBase.split('//')[1]}/front/document.send.php?file=_pictures/${this.props.image}`
    }

    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then((response) => {
      response.arrayBuffer().then((buffer) => {
        this.setState({
          image: `data:image/jpeg;base64,${IconItemList.arrayBufferToBase64(buffer)}`,
        })
      })
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let style = {
      backgroundColor: this.props.backgroundColor,
      width: this.props.size,
      height: this.props.size,
      backgroundSize: 'cover',
      display: 'inline-block',
    }
    let className = ''
    if (this.props.type !== 'base64') {
      className = 'list-pane__picture'
      style = {
        ...style,
        WebkitBorderRadius: this.props.size,
        MozBorderRadius: this.props.size,
        borderRadius: this.props.size,
      }
    }

    return (
      <div className={className} style={style}>
        <div
          className={this.props.imgClass}
          onClick={this.props.imgClick}
          role="presentation"
        >
          <img
            alt=""
            src={this.state.image}
            style={style}
          />
        </div>
      </div>
    )
  }
}

IconItemList.defaultProps = {
  size: 100,
  backgroundColor: '#e6e6e6',
  image: '',
  type: 'file',
  isMin: false,
  imgClick: () => {},
  imgClass: '',
}

IconItemList.propTypes = {
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.oneOf(['file', 'base64']),
  isMin: PropTypes.bool,
  imgClick: PropTypes.func,
  imgClass: PropTypes.string,
}

export default IconItemList
