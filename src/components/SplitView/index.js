import React from 'react'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './imgWithPopper'
import SpanWithPopper from './spanWithAnchor'
import { ScrollSync, ScrollSyncPane } from '../ScrollSync'

// TODO: Pass routes as props
// TODO: Create manual redirect for the description of SplitView (history.push('/example')) 

const splitView = ({
  expanded,  
  contract,
  handleExpand,
  handleContract,
  handleSetTimeOut
}) => {
  
  handleSetTimeOut()

  return (
    <ScrollSync>
      <div className="splitview-block">
        <div className="splitview-wrapper__div">
          <nav className="splitview-wrapped__navbar">

            <ScrollSyncPane>
              <div className="splitview-wrapper-wrapper__div">
                <section className="splitview-wrapped-navbar-wrapped-top__section">
                  <ImgWithPopper
                    to={'/app'}
                    alt='Flyve MDM Dashboard'
                    img='/images/logo2.png'
                    title='Dashboard'
                    disabled={expanded}
                  />
                  <IconWithPopper
                    to={'/app/devices'}
                    iconName='deviceIcon'
                    title='Device'
                    disabled={expanded}/>
                  <IconWithPopper
                    to={'/app/invitations'}
                    iconName='emailIcon'
                    title='Invitations'
                    disabled={expanded}/>
                  <IconWithPopper
                    to={'/app/fleets'}
                    iconName='goToStartIcon'
                    title='Fleets'
                    disabled={expanded}/>                
                  <IconWithPopper
                    to={'/app/files'}
                    iconName='filesIcon'
                    title='Files'
                    disabled={expanded}/>  
                  <IconWithPopper
                    to={'/app/applications'}
                    iconName='switchAppsIcon'
                    title='Applications'
                    disabled={expanded}/>
                  <IconWithPopper
                    to={'/app/users'}
                    iconName='peopleIcon'
                    title='Contacts'
                    disabled={expanded}/>  
                  <IconWithPopper
                    to={'/app/search'}
                    iconName='searchIcon'
                    title='Search devices, fleets or other item'
                    disabled={expanded}/>  
                </section>
                <section className="splitview-wrapped-navbar-wrapped-bottom__section">
                  <IconWithPopper
                    to={'/app/settings'}
                    iconName='settingsIcon'
                    title='Setting of Flyve MDM'
                    disabled={expanded}/>  
                  <IconWithPopper
                    to={'/app/about'}
                    iconName='contactInfoIcon'
                    title='About of Flyve MDM'
                    disabled={expanded}/> 
                  <IconWithPopper
                    click={() => 0}
                    iconName='PowerButtonIcon'
                    title='Logout'
                    disabled={expanded}/> 
                </section>
              </div>
            </ScrollSyncPane>
          </nav>
          { expanded && (
          <nav className="splitview-wrapped__navbar" onClick={handleContract}>
            <ScrollSyncPane>
              <div className={`splitview-wrapper-wrapper__div --large --end --opening ${
                  contract && '--closing'
                }`}>
                <section className="splitview-wrapped-navbar-wrapped-top__section --description">
                  <SpanWithPopper description='Dashboard' />
                  <SpanWithPopper description='Devices' />
                  <SpanWithPopper description='Invitations' />
                  <SpanWithPopper description='Fleets' />
                  <SpanWithPopper description='Files' />
                  <SpanWithPopper description='Applications' />
                  <SpanWithPopper description='Contact' />
                  <SpanWithPopper description='Search' />
                </section>
                <section className="splitview-wrapped-navbar-wrapped-bottom__section --description">
                  <SpanWithPopper description='Setting of Flyve MDM ' />
                  <SpanWithPopper description='About of Flyve MDM' />
                  <SpanWithPopper description='Logout' />
                </section>
              </div>
            </ScrollSyncPane>
          </nav>
          )}
        </div>
      </div>
    </ScrollSync>
  )
}
  
export default splitView
