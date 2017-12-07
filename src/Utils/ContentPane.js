import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from './Calc100PercentMinus'

export default class ContentPane extends Component {

  render() {
    return (
      <div className="contentPane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
        { this.props.children }
      </div>
    )
  }
}
ContentPane.propTypes = {
  itemListPaneWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}