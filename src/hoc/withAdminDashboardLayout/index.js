import React, { Component } from 'react';
import SplitView from "../../components/SplitView"
import HeaderAdminDashboard from '../../components/HeaderAdminDashboard';

const withAdminDashboardLayout = WrappedComponent=> {
  class AdminDashboardLayout extends Component {
    constructor (props) {
      super(props)
      this.state = {
        expanded: false,
        contract: false
      }
    }

    handleToggleExpand = () => {
      this.state.expanded === false ? this.handleExpand() : this.handleContract()
    }
  
    handleExpand = () => {
      this.setState({
        expanded: true,
        contract: false
      })
    }

    handleContract = () => {
      this.setState({
        contract: true
      })
    }

    handleSetTimeOut = () => {
      this.state.contract && setTimeout(() => {
        this.setState({
          contract: false,
          expanded: false
        });
      }, 250)
    }

    render() {
      return (
        <React.Fragment>
          <HeaderAdminDashboard
            handleToggleExpand={this.handleToggleExpand}
          />
          <SplitView
            expanded={this.state.expanded}
            contract={this.state.contract}
            handleExpand={this.handleExpand}
            handleContract={this.handleContract}
            handleSetTimeOut={this.handleSetTimeOut}
          />
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  return AdminDashboardLayout
}

export default withAdminDashboardLayout;