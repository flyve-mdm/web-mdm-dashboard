import React, { Component } from 'react'

class ContentPane extends Component {

  constructor(props) {
    super(props)
    const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    this.state = {
      updateAnimation: display.animations,
      animate: display.animations ? "content-pane--animate": ""
    }
  }

  componentDidMount() {
    this.handleAnimation()
  }

  handleAnimation = () => {
    if (this.state.updateAnimation) {
      this.setState({
        animate: "content-pane--animate"
      }, () => {
        setTimeout(() => {
          this.setState({
            animate: ""
          })
        }, 2000)
      })
    }
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

export default ContentPane