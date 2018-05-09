import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { slideTop } from '../../shared/animations/index'

class ContentPane extends PureComponent {

  componentDidMount() {
    slideTop(this.pane).play()
  }
  
  forceAnimation () {
    slideTop(this.pane).play()
  }

  render() {
    return (
      <div className={`content-pane ${this.props.className}`} ref={pane => this.pane = pane}>
        { this.props.children }
      </div>
    )
  }
}

ContentPane.defaultProps = {
  className: ''
}

ContentPane.propTypes = {
  className: PropTypes.string
}

export default ContentPane