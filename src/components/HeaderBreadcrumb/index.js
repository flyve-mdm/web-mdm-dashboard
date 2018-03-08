import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class HeaderBreadcrumb extends React.Component {

  breadcrumbs () {
    let breadcrumbs = []
    const addresses = this.props.history.location.pathname.split("/")
    for (let index = 2; index < addresses.length; index++) {
      let path = '/app'
      for (let i = 2; i < index + 1; i++) {
        path += `/${addresses[i]}`
      }
      breadcrumbs.push (
        <React.Fragment key={path}>
          <span className="header-breadcrumb-separator">/</span>
          <span>
            <Link to={path}>
              {addresses[index]}
            </Link>
          </span>
        </React.Fragment>
      )
    }

    return breadcrumbs
  }
  
  render () {

    return (
      <header className="header-block">
  
        <div className="header-icon">
          <span className="burgerIcon" onClick={this.props.handleToggleExpand}/>
        </div>
  
        <nav className="header-breadcrumb">
          <span>
            <Link to='/app'>
              Dashboard
            </Link>
          </span>

          {this.breadcrumbs()}

        </nav>
  
      </header>
    )
  }
}

HeaderBreadcrumb.propTypes = {
  handleToggleExpand: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

 
export default HeaderBreadcrumb