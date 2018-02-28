import React, { Component } from 'react'
import SplitView from "../../components/SplitView"
import HeaderAdminDashboard from '../../components/HeaderAdminDashboard'

// TODO: Passing Routes to props for generate NavLink in SplitView component

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
          <main style={{display: 'inline-flex'}}>
            <SplitView
              expanded={this.state.expanded}
              contract={this.state.contract}
              handleExpand={this.handleExpand}
              handleContract={this.handleContract}
              handleSetTimeOut={this.handleSetTimeOut}
            />
            <WrappedComponent {...this.props} />
          </main>
        </React.Fragment>
      )
    }
  }

  return AdminDashboardLayout
}

export default withAdminDashboardLayout;