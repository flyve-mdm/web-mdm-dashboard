/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import {
  splitview,
} from 'shared/animationsWinJs'
import logo from 'assets/images/dashboard.svg'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './ImgWithPopper'
import SpanWithPopper from './SpanWithPopper'
import {
  ScrollSync,
  ScrollSyncPanel,
} from '../ScrollSync'

/**
 * Component with side menu
 * @class SplitView
 * @extends PureComponent
 */
class SplitView extends PureComponent {
  /**
   * Run 'splitview' animation
   * @function componentDidUpdate
   */
  componentDidUpdate() {
    if (this.props.expanded) {
      splitview(this.splitview, !this.props.contract).play()
    }
  }

  /**
   * Close session
   * @function logout
   */
  logout = () => {
    this.props.logout()
  }

  /**
   * Render component
   * @function render
   */
  render() {
    this.props.handleSetTimeOut()

    let toRender = ''

    if (this.props.mode !== 'small' || this.props.expanded) {
      toRender = (
        <>
          <ScrollSync>
            <div className="splitview-block">
              <div className="splitview-wrapper__div">
                <nav className="splitview-wrapped__navbar">
                  <ScrollSyncPanel>
                    <div className="splitview-wrapper-wrapper__div">
                      <section className="splitview-wrapped-navbar-wrapped-top__section">
                        <ImgWithPopper
                          to={`${publicURL}/app`}
                          alt="Flyve MDM Dashboard"
                          img={logo}
                          title={I18n.t('commons.dashboard')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/devices`}
                          iconName="deviceIcon"
                          title={I18n.t('commons.device')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/invitations`}
                          iconName="emailIcon"
                          title={I18n.t('commons.invitations')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/fleets`}
                          iconName="goToStartIcon"
                          title={I18n.t('commons.fleets')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/files`}
                          iconName="filesIcon"
                          title={I18n.t('commons.files')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/applications`}
                          iconName="switchAppsIcon"
                          title={I18n.t('commons.applications')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/users`}
                          iconName="peopleIcon"
                          title={I18n.t('commons.users')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/search`}
                          iconName="searchIcon"
                          title={I18n.t('commons.search_or_other')}
                        />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section">
                        <IconWithPopper
                          to={`${publicURL}/app/settings`}
                          iconName="settingsIcon"
                          title={I18n.t('commons.setting_flyve_mdm')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/about`}
                          iconName="contactInfoIcon"
                          title={I18n.t('commons.about_flyve_mdm')}
                        />
                        <IconWithPopper
                          click={this.logout}
                          iconName="PowerButtonIcon"
                          title={I18n.t('commons.logout')}
                        />
                      </section>
                    </div>
                  </ScrollSyncPanel>
                </nav>
                { this.props.expanded
                  ? (
                    <nav
                      className="splitview-wrapped__navbar"
                      onClick={() => {
                        if (this.props.mode !== 'large') {
                          this.props.handleContract()
                        }
                      }}
                      ref={(nav) => { this.splitview = nav }}
                      role="presentation"
                    >
                      <ScrollSyncPanel>
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
                      </ScrollSyncPanel>
                    </nav>
                  ) : ''
                }
              </div>
            </div>
          </ScrollSync>
        </>
      )
    }

    return toRender
  }
}

SplitView.propTypes = {
  logout: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  contract: PropTypes.bool.isRequired,
  handleContract: PropTypes.func.isRequired,
  handleSetTimeOut: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
}

export default SplitView
