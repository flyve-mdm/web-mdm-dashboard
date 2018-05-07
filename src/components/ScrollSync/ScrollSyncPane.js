import { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class ScrollSyncPane extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.object,
    group: PropTypes.string
  }

  static defaultProps = {
    group: 'default'
  }

  static contextTypes = {
    registerPane: PropTypes.func.isRequired,
    unregisterPane: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.node = this.props.attachTo || ReactDOM.findDOMNode(this)
    this.context.registerPane(this.node, this.props.group)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.group !== nextProps.group) {
      this.context.unregisterPane(this.node, this.props.group)
      this.context.registerPane(this.node, nextProps.group)
    }
  }

  componentWillUnmount() {
    this.context.unregisterPane(this.node, this.props.group)
  }

  render() {
    return this.props.children
  }
}

export default ScrollSyncPane