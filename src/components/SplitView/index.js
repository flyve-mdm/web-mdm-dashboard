import React from 'react';

const SplitView = props => {
  return (
    <div className="splitview-block">
      <div className="splitview-wrapper__div">
        <nav className="splitview-wrapped__navbar">
          <div className="splitview-wrapper-wrapper__div">
            <section className="splitview-wrapped-navbar-wrapped-top__section">
              <div>
                <span className='homeIcon'/>
              </div>

              <div>
                <span className='deviceIcon'/>
              </div>

              <div>
                <span className='emailIcon'/>
              </div>

              <div>
                <span className='goToStartIcon'/>
              </div>

              <div>
                <span className='filesIcon'/>
              </div>

              <div>
                <span className='switchAppsIcon'/>
              </div>  

              <div>
                <span className='peopleIcon'/>
              </div>  

              <div>
                <span className='searchIcon'/>
              </div>  
            </section>
            <section className="splitview-wrapped-navbar-wrapped-bottom__section">
              <div>
                <span className='settingsIcon'/>
              </div>

              <div>
                <span className='contactInfoIcon'/>
              </div>  
            </section>
          </div>
        </nav>
      </div>
    </div>
  )
}
 
export default SplitView;