import React from 'react'

const headerBreadcrumb = ({handleToggleExpand}) => {
  
  const url = window.location.href.replace(/\/$/, '')

  let lastSeg = url.substr(url.lastIndexOf('/') + 1)

  lastSeg = lastSeg === 'app' ? 'Home' : lastSeg.replace(/\b\w/g, function(l){ return l.toUpperCase() })
  
  return (
    <header className="header-block --breadcrumb-mode">
      <nav className="header-content-left__nav --breadcrumb-mode">
        <div className="header-breadcrumb__div">
          <span>Dashboard</span>
          <span>/</span>
          <span>{ lastSeg }</span>
        </div>
      </nav>
    </header>
  )
}
 
export default headerBreadcrumb