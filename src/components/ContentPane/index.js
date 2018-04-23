import React, { Component } from 'react'
import { slideTop } from '../../shared/animations'

class ContentPane extends Component {

  componentDidMount() {
    slideTop(this.pane).play()
  }

  render() {
    return (
      <div className="content-pane" ref={pane => this.pane = pane}>
        <div id="content-pane-block" className="content-pane-block">
        { this.props.children }
        </div>
      </div>
    )
  }
}

export default ContentPane