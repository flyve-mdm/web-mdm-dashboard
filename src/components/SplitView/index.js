import React from 'react'
import PropTypes from 'prop-types'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './imgWithPopper'
import SpanWithPopper from './spanWithAnchor'
import { ScrollSync, ScrollSyncPane } from '../ScrollSync'
import Confirmation from '../../components/Confirmation'

class SplitView extends React.Component {

  logout = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      this.props.history.push('/logout')
    }
  }

  render () {
    this.props.handleSetTimeOut()

    let toRender = ""

    if (this.props.mode !== 'small' || this.props.expanded) {
      toRender = (
        <React.Fragment>
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
                          title='Users'
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
                          click={this.logout}
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
                        <SpanWithPopper description='Dashboard' to="/app" />
                        <SpanWithPopper description='Devices' to="/app/devices" />
                        <SpanWithPopper description='Invitations' to="/app/invitations" />
                        <SpanWithPopper description='Fleets' to="/app/fleets" />
                        <SpanWithPopper description='Files' to="/app/files" />
                        <SpanWithPopper description='Applications' to="/app/applications" />
                        <SpanWithPopper description='Users' to="/app/users" />
                        <SpanWithPopper description='Search' to="/app/search" />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section --description">
                        <SpanWithPopper description='Setting of Flyve MDM ' to="/app/settings" />
                        <SpanWithPopper description='About of Flyve MDM' to="/app/about" />
                        <SpanWithPopper description='Logout' click={this.logout} />
                      </section>
                    </div>
                  </ScrollSyncPane>
                </nav>
                )}
              </div>
            </div>
          </ScrollSync>

          <Confirmation 
            title="Close session" 
            message='Are you sure you want to close your session?' 
            reference={el => this.contentDialog = el} 
          />
        </React.Fragment>
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
  handleToggleExpand: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default SplitView
