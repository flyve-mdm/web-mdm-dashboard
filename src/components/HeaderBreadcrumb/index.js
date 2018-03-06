import React from 'react'

const HeaderBreadcrumb = ({handleToggleExpand}) => {
  
  const url = window.location.href.replace(/\/$/, '')

  let lastSeg = url.substr(url.lastIndexOf('/') + 1)

  lastSeg = lastSeg === 'app' ? 'Home' : lastSeg.replace(/\b\w/g, function(l){ return l.toUpperCase() })
  
  return (
    <header className="header-block">

      <div className="header-icon">
        <span className="burgerIcon" onClick={handleToggleExpand}/>
      </div>

      <nav className="header-breadcrumb">
        <span>Dashboard</span>
        <span className="header-breadcrumb-separator">/</span>
        <span>{ lastSeg }</span>
      </nav>

    </header>
  )
}
 
export default HeaderBreadcrumb