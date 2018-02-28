import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WinJS from 'winjs'
import calc100PercentMinus from '../../shared/calc100PercentMinus';

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
      <div id="main" className="contentPane" style={{ width: calc100PercentMinus(this.props.itemListPaneWidth) }}>
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