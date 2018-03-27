import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ContentPane extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animate: this.props.updateAnimation ? "content-pane--animate": null
    }
  }

  componentDidUpdate() {
    if (this.props.updateAnimation) {
      this.handleAnimation()
    }
  }

  componentDidMount() {
    this.handleAnimation()
  }

  handleAnimation = () => {
    this.setState({
      animate: "content-pane--animate"
    }, () => {
      setTimeout(() => {
        this.setState({
          animate: null
        })
      }, 2000)
    })
  }

  render() {
    return (
      <div className={`content-pane ${this.state.animate}`}>
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
  updateAnimation: false
}

export default ContentPane