import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from './Calc100PercentMinus'
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
    WinJS.UI.Animation.enterContent(document.getElementById('main'), { top: '0px', left: '30px', rtlflip: true }, { mechanism: "transition" })
  }

  render() {
    return (
      <div id="main" className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
        { this.props.children }
      </div>
    )
  }
}

ContentPane.propTypes = {
  itemListPaneWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  updateAnimation: PropTypes.bool,
}

ContentPane.defaultProps = {
  updateAnimation: false,
}

export default ContentPane