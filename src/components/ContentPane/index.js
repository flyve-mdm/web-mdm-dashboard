import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WinJS from 'winjs'

class ContentPane extends Component {

  componentDidUpdate() {
    if (this.props.updateAnimation) {
      this.handleAnimation()
    }
  }

  componentDidMount() {
    this.handleAnimation()
  }

  handleAnimation = () => {
    WinJS.UI.Animation.enterContent(document.getElementById('content-pane-block'), {
      top: '0px', 
      left: '30px', 
      rtlflip: true 
    }, {
      mechanism: "transition" 
    })
  }

  render() {
    return (
      <div className="content-pane">
        <div id="content-pane-block" className="content-pane-block">
        { this.props.children }
        </div>
      </div>
      
    )
  }
}

ContentPane.propTypes = {
  updateAnimation: PropTypes.bool,
}

ContentPane.defaultProps = {
  updateAnimation: false,
}

export default ContentPane