import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { slideTop } from '../../shared/animations'

class ContentPane extends Component {

  componentDidMount() {
    slideTop(this.pane).play()
  }

  render() {
    return (
      <div className={`content-pane ${this.props.className}`} ref={pane => this.pane = pane}>
        <div id="content-pane-block" className="content-pane-block">
        { this.props.children }
        </div>
      </div>
    )
  }
}

ContentPane.propTypes = {
  className: PropTypes.string
}

export default ContentPane