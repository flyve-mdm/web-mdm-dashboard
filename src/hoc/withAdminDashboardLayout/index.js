import React, { Component } from 'react'
import SplitView from "../../components/SplitView"
import HeaderBreadcrumb from '../../components/HeaderBreadcrumb'

// TODO: Passing Routes to props for generate NavLink in SplitView component

const TIMEOUT_CONTRACT = 420

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
      }, TIMEOUT_CONTRACT)
    }

    render() {
      return (
        <main>
          <SplitView
            expanded={this.state.expanded}
            contract={this.state.contract}
            handleExpand={this.handleExpand}
            handleContract={this.handleContract}
            handleSetTimeOut={this.handleSetTimeOut}
            handleToggleExpand={this.handleToggleExpand}
          />
          <div>
            <HeaderBreadcrumb /> 
            <WrappedComponent {...this.props} />
          </div>
        </main>
      )
    }
  }

  return AdminDashboardLayout
}

export default withAdminDashboardLayout