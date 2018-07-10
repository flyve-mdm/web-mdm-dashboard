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

import React from "react"
import history from "../../shared/history"
import getQueryString from "../../shared/getQueryString"
import I18n from '../../shared/i18n'

/**
 * Component with the display of the error pages
 * @function ErrorPage
 * @return {component}
 */
export default () => {
  /** Get the error type of the query string 'code' (by default '404'). */
  const errorCode = (getQueryString(history).code || "404")
  const title = I18n.t(`error.${errorCode}.title`)
  const message = I18n.t(`error.${errorCode}.message`)
  return (
    <div className="authentication error" style={{ textAlign: 'center'}} >
      <section>
        <figure>
          <img
            alt="Flyve MDM Dashboard"
            src={require('../../assets/images/dashboard.svg')}
          />
        </figure>
        <h1>{I18n.t('commons.error')} {errorCode}</h1>
        <h3>{title}</h3>
        <p>{message}</p>
      </section>
      <footer>
        <a href="https://flyve-mdm.com/privacy-policy/">
          {I18n.t('commons.terms_and_conditions')}
        </a>
        <br />

        <span>
          © 2017 - 2018 Teclib'.
        </span>
        <br />
      </footer>
    </div>
  )
}
