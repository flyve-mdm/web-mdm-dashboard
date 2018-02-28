import React from 'react';

const HeaderAdminDashboard = ({
  handleToggleExpand
}) => (
  <header className="header-block">
    <nav className="header-content-left__nav">
      <div>
        <span className="burgerIcon" onClick={handleToggleExpand}/>
      </div>
      <div>
        <span>
          Flyve MDM
        </span>
      </div>
    </nav>
    <nav className="header-content-right__nav">
      <div>
        <span className="contactSolidIcon" />
      </div>
      <div>
        <span>
          Username
        </span>
      </div>
      <div>
        <img alt="Log out" src="images/logout.png"/>
      </div>
    </nav>
  </header>
)
 
export default HeaderAdminDashboard;