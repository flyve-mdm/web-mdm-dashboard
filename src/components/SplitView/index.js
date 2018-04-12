import React from 'react'
import PropTypes from 'prop-types'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './imgWithPopper'
import SpanWithPopper from './spanWithAnchor'
import { ScrollSync, ScrollSyncPane } from '../ScrollSync'
import Confirmation from '../../components/Confirmation'
import withGLPI from '../../hoc/withGLPI'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../store/authentication/actions'
import { I18n } from "react-i18nify"
import publicURL from '../../shared/publicURL'

function mapDispatchToProps(dispatch) {
  const actions = {
    logout: bindActionCreators(logout, dispatch)
  }
  return { actions }
}


class SplitView extends React.Component {

  logout = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      this.props.actions.logout(this.props.history)
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
                { this.props.expanded && (
                <nav className="splitview-wrapped__navbar" onClick={this.props.handleContract}>
                  <ScrollSyncPane>
                    <div className={`splitview-wrapper-wrapper__div --large --end --opening ${
                        this.props.contract && '--closing'
                      }`}>
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
                )}
              </div>
            </div>
          </ScrollSync>

          <Confirmation 
            title={I18n.t('logout.close_session')}
            message={I18n.t('settings.security.close_session_message')} 
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
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired
}

export default connect(
  null,
  mapDispatchToProps
)(withGLPI(SplitView))