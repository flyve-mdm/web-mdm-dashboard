import React, { Component } from 'react'
import SplitView from "../../components/SplitView"
import HeaderBreadcrumb from '../../components/HeaderBreadcrumb'
import getMode from '../../shared/getMode'
import configureDisplay from '../../shared/configureDisplay'
import setGlpiCookie from '../../shared/setGlpiCookie'
import animations from '../../shared/animations'
import glpi from '../../shared/glpiApi'

// TODO: Passing Routes to props for generate NavLink in SplitView component

const TIMEOUT_CONTRACT = 250

const withAdminDashboardLayout = WrappedComponent => {
  class AdminDashboardLayout extends Component {
    constructor (props) {
      super(props)
      this.state = {
        expanded: false,
        contract: false,
        mode: getMode(),
        iframe: ''
      }
    }

    handleResize = () => {
      let prevMode = this.state.mode
      let nextMode = getMode()

      if (prevMode !== nextMode) {
          this.setState({mode: nextMode})
      }
    }

    componentWillMount () {
      window.addEventListener('resize', this.handleResize)
      configureDisplay()
      animations()
    }

    componentDidMount = async () => {
      const { cfg_glpi } = await glpi.getGlpiConfig()
      this.setState(
        { iframe: <iframe title="glpi-backend" height="0" src={cfg_glpi.url_base}></iframe> }, 
        setGlpiCookie()
      )
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize)
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
        })
      }, TIMEOUT_CONTRACT)
    }

    render() {
      return (
        <main>

          <HeaderBreadcrumb 
            handleToggleExpand={this.handleToggleExpand} 
            history={this.props.history}
          /> 

          {this.state.iframe}

          <div className="flex-block">
            <SplitView
              expanded={this.state.expanded}
              contract={this.state.contract}
              handleExpand={this.handleExpand}
              handleContract={this.handleContract}
              handleSetTimeOut={this.handleSetTimeOut}
              handleToggleExpand={this.handleToggleExpand}
              mode={this.state.mode}
              history={this.props.history}
            />
            <WrappedComponent {...this.props} mode={this.state.mode} />
          </div>
        
        </main>
      )
    }
  }

  return AdminDashboardLayout
}

export default  withAdminDashboardLayout