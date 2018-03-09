import React from 'react'
import PropTypes from 'prop-types'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './imgWithPopper'
import SpanWithPopper from './spanWithAnchor'
import { ScrollSync, ScrollSyncPane } from '../ScrollSync'

// TODO: Pass routes as props
// TODO: Create manual redirect for the description of SplitView (history.push('/example')) 

class SplitView extends React.Component {
  render () {

    this.props.handleSetTimeOut()

    let toRender = ""

    if (this.props.mode !== 'small' || this.props.expanded) {
      toRender = (
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
                        img='/images/dashboard.svg'
                        title='Dashboard'
                        disabled={this.props.expanded}
                      />
                      <IconWithPopper
                        to={'/app/devices'}
                        iconName='deviceIcon'
                        title='Device'
                        disabled={this.props.expanded}/>
                      <IconWithPopper
                        to={'/app/invitations'}
                        iconName='emailIcon'
                        title='Invitations'
                        disabled={this.props.expanded}/>
                      <IconWithPopper
                        to={'/app/fleets'}
                        iconName='goToStartIcon'
                        title='Fleets'
                        disabled={this.props.expanded}/>                
                      <IconWithPopper
                        to={'/app/files'}
                        iconName='filesIcon'
                        title='Files'
                        disabled={this.props.expanded}/>  
                      <IconWithPopper
                        to={'/app/applications'}
                        iconName='switchAppsIcon'
                        title='Applications'
                        disabled={this.props.expanded}/>
                      <IconWithPopper
                        to={'/app/users'}
                        iconName='peopleIcon'
                        title='Contacts'
                        disabled={this.props.expanded}/>  
                      <IconWithPopper
                        to={'/app/search'}
                        iconName='searchIcon'
                        title='Search devices, fleets or other item'
                        disabled={this.props.expanded}/>  
                    </section>
                    <section className="splitview-wrapped-navbar-wrapped-bottom__section">
                      <IconWithPopper
                        to={'/app/settings'}
                        iconName='settingsIcon'
                        title='Setting of Flyve MDM'
                        disabled={this.props.expanded}/>  
                      <IconWithPopper
                        to={'/app/about'}
                        iconName='contactInfoIcon'
                        title='About of Flyve MDM'
                        disabled={this.props.expanded}/> 
                      <IconWithPopper
                        click={() => 0}
                        iconName='PowerButtonIcon'
                        title='Logout'
                        disabled={this.props.expanded}/> 
                    </section>
                  </div>
                </ScrollSyncPane>
              </nav>
              { this.props.expanded && (
              <nav className="splitview-wrapped__navbar" onClick={this.props.handleContract}>
                <ScrollSyncPane>
                  <div className={`splitview-wrapper-wrapper__div --large --end --opening ${
                      this.props.contract && '--closing'
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
    
    return toRender
  }
}

SplitView.propTypes = {
  expanded: PropTypes.bool.isRequired,  
  contract: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
  handleContract: PropTypes.func.isRequired,
  handleSetTimeOut: PropTypes.func.isRequired,
  handleToggleExpand: PropTypes.func.isRequired
}

export default SplitView
