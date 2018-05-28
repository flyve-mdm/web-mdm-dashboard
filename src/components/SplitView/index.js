import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './imgWithPopper'
import SpanWithPopper from './spanWithAnchor'
import { ScrollSync, ScrollSyncPane } from '../ScrollSync'
import withGLPI from '../../hoc/withGLPI'
import { I18n } from "react-i18nify"
import publicURL from '../../shared/publicURL'
import { splitview } from '../../shared/animationsWinJs'

class SplitView extends PureComponent {

  logout = () => {
    this.props.logout()
  }

  componentDidUpdate () {
    if (this.props.expanded) {
      splitview(this.splitview, !this.props.contract).play()
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
                          to={`${publicURL}/app`}
                          alt='Flyve MDM Dashboard'
                          img={require('../../assets/images/dashboard.svg')}
                          title={I18n.t('commons.dashboard')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/devices`}
                          iconName='deviceIcon'
                          title={I18n.t('commons.device')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/invitations`}
                          iconName='emailIcon'
                          title={I18n.t('commons.invitations')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/fleets`}
                          iconName='goToStartIcon'
                          title={I18n.t('commons.fleets')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/files`}
                          iconName='filesIcon'
                          title={I18n.t('commons.files')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/applications`}
                          iconName='switchAppsIcon'
                          title={I18n.t('commons.applications')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/users`}
                          iconName='peopleIcon'
                          title={I18n.t('commons.users')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/search`}
                          iconName='searchIcon'
                          title={I18n.t('commons.search_or_other')}
                          disabled={this.props.expanded}
                        />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section">
                        <IconWithPopper
                          to={`${publicURL}/app/settings`}
                          iconName='settingsIcon'
                          title={I18n.t('commons.setting_flyve_mdm')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/about`}
                          iconName='contactInfoIcon'
                          title={I18n.t('commons.about_flyve_mdm')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          click={this.logout}
                          iconName='PowerButtonIcon'
                          title={I18n.t('commons.logout')}
                          disabled={this.props.expanded}
                        />
                      </section>
                    </div>
                  </ScrollSyncPane>
                </nav>
                { this.props.expanded ? 
                  (
                    <nav 
                      className="splitview-wrapped__navbar"
                      onClick={() => this.props.handleContract()}
                      ref={nav => this.splitview = nav}
                    >
                      <ScrollSyncPane>
                        <div className="splitview-wrapper-wrapper__div --large --end">
                          <section className="splitview-wrapped-navbar-wrapped-top__section --description">
                            <SpanWithPopper description={I18n.t('commons.dashboard')} to={`${publicURL}/app`} />
                            <SpanWithPopper description={I18n.t('commons.devices')} to={`${publicURL}/app/devices`} />
                            <SpanWithPopper description={I18n.t('commons.invitations')} to={`${publicURL}/app/invitations`} />
                            <SpanWithPopper description={I18n.t('commons.fleets')} to={`${publicURL}/app/fleets`} />
                            <SpanWithPopper description={I18n.t('commons.files')} to={`${publicURL}/app/files`} />
                            <SpanWithPopper description={I18n.t('commons.applications')} to={`${publicURL}/app/applications`} />
                            <SpanWithPopper description={I18n.t('commons.users')} to={`${publicURL}/app/users`} />
                            <SpanWithPopper description={I18n.t('commons.search')} to={`${publicURL}/app/search`} />
                          </section>
                          <section className="splitview-wrapped-navbar-wrapped-bottom__section --description">
                            <SpanWithPopper description={I18n.t('commons.setting_flyve_mdm')} to={`${publicURL}/app/settings`} />
                            <SpanWithPopper description={I18n.t('commons.about_flyve_mdm')} to={`${publicURL}/app/about`} />
                            <SpanWithPopper description={I18n.t('commons.logout')} click={this.logout} />
                          </section>
                        </div>
                      </ScrollSyncPane>
                    </nav>
                  ) : ""
                } 
              </div>
            </div>
          </ScrollSync>
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
  glpi: PropTypes.object.isRequired
}

export default withGLPI(SplitView)