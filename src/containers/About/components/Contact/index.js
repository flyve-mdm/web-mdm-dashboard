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
 * Contant information
 * @constant Contant
 * @type {component}
 */
const Contact = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>
      { I18n.t('about.contact.title') }
    </h2>
    <div className="about-pane" style={{ margin: '10px' }}>
      {/* eslint-disable global-require */}
      <img src={require('../../../../assets/images/logo-teclib.png')} alt="Teclib" />
      <p>
        { I18n.t('about.contact.description') }
      </p>
      <div className="separator" />
      <div className="content-info">
        <ul className="contact-list">
          <li>
            <span className="phoneIcon" />
            <div>
              <div>
                { I18n.t('commons.email') }
              </div>
              <a href="mailto:contact@teclib.com">
                contact@teclib.com
              </a>
            </div>
          </li>
          <li>
            <span className="phoneIcon" />
            <div>
              <div>
                { I18n.t('commons.call') }
              </div>
              <a href="tel:+34512702140">
                +34512702140
              </a>
            </div>
          </li>
          <li>
            <span className="mapIcon" />
            <div>
              <div>
                { I18n.t('commons.map') }
              </div>
              <a href="https://goo.gl/maps/qDijeVyCUwq">
                Barcelona,
                {' '}
                { I18n.t('commons.Spain') }
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </ContentPane>
)

export default Contact
