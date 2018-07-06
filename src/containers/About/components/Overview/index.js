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

/** import dependencies */
import React from 'react'
import I18n from '../../../../shared/i18n'
import ContentPane from '../../../../components/ContentPane'

/**
 * @constant Overview
 * @type {component}
 */
const Overview = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>
      {I18n.t('about.overview.title')}
    </h2>
    <div className="about-pane" style={{ margin: '10px' }}>
      <p>
        {I18n.t('about.overview.flyve_mdm_is')}
      </p>
      <p>
        {I18n.t('about.overview.our_solution')}
      </p>
      <ul>
        <li>
          {I18n.t('about.overview.provided_as_sass_platform')}
        </li>
        <li>
          {I18n.t('about.overview.google_indepent')}
        </li>
        <li>
          {I18n.t('about.overview.deploy_and_configure')}
        </li>
        <li>
          {I18n.t('about.overview.deploy_files')}
        </li>
        <li>
          {I18n.t('about.overview.wipe_phone')}
        </li>
        <li>
          {I18n.t('about.overview.work_with_devices')}
        </li>
        <li>
          {I18n.t('about.overview.simple_web_application')}
        </li>
      </ul>
      <p>
        {I18n.t('about.overview.source_codes')}
      </p>
    </div>
  </ContentPane>
)

export default Overview
