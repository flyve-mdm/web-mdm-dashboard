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

/** impport dependencies */
import React from 'react'
import I18n from '../../../../shared/i18n'
import ContentPane from '../../../../components/ContentPane'

/**
 * @constant TermsOfUse
 * @type {component}
 */
const TermsOfUse = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>
      {I18n.t('about.term_of_use.title')}
    </h2>
    <div className="about-pane" style={{ margin: '10px' }}>
      <p>
        {I18n.t('about.term_of_use.using_our_website')}
      </p>
      <p>
        {I18n.t('about.term_of_use.these_terms')}
      </p>
      <p>
        <strong>
            I.
          {' '}
          { I18n.t('about.term_of_use.definitions') }
        </strong>
      </p>
      <p>
        <strong>
          &#8220;
          { I18n.t('about.term_of_use.the_editor') }
          &#8221;
        </strong>
        &nbsp;
        { I18n.t('about.term_of_use.teclib_spain')}
      </p>
      <p>
        <strong>
          &#8220;
          { I18n.t('about.term_of_use.services') }
          &#8221;
        </strong>
        &nbsp;
        { I18n.t('about.term_of_use.any_or_several')}
      </p>
      <p>
        <strong>
          &#8220;
          { I18n.t('about.term_of_use.company') }
          &#8221;
        </strong>
        &nbsp;
        {I18n.t('about.term_of_use.any_company') }
      </p>
      <p>
        <strong>
          &#8220;
          {' '}
          { I18n.t('about.term_of_use.client') }
          {' '}
          &#8221;
        </strong>
        &nbsp;
        {I18n.t('about.term_of_use.beneficial_owner') }
      </p>
      <p>
        <strong>
          &#8220;
          {' '}
          { I18n.t('about.term_of_use.contact_form') }
          &#8221;
        </strong>
        &nbsp;
        {I18n.t('about.term_of_use.standard_contact') }
      </p>
      <p>
        <strong>
          &#8220;
          {' '}
          { I18n.t('about.term_of_use.communication') }
          &#8221;
        </strong>
        &nbsp;
        {I18n.t('about.term_of_use.communication_between') }
      </p>
      <p>
        <u>
          <strong>
            II.
            {' '}
            { I18n.t('about.term_of_use.general_notes') }
          </strong>
        </u>
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.complaints_procedure.title') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.complaints_procedure.management_company') }
        {' '}
        <br />
        { I18n.t('about.term_of_use.complaints_procedure.complaints_can') }
        {' '}
        <br />
        { I18n.t('about.term_of_use.complaints_procedure.please_substantiate') }
      </p>
      <p>
        <u>
          <strong>
            III.
            {' '}
            { I18n.t('about.term_of_use.our_services.title') }
          </strong>
        </u>
      </p>
      <p>
        <strong>
          GLPi Network
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.distribution') }
      </p>
      <p>
        <strong>
          Kimios DMS
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.java_based') }
      </p>
      <p>
        <strong>
          Uhuru Mobile
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.secure_operating_system') }
        {' '}
        <br />
        { I18n.t('about.term_of_use.our_services.uhuru_analyzes') }
      </p>
      <p>
        <strong>
          Armadito Antivirus
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.open_source_antivirus') }
      </p>
      <p>
        <strong>
          Flyve MDM
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.mobile_device_management') }
      </p>
      <p>
        <strong>
          Teclib
          &#8217;
          {' '}
          { I18n.t('about.term_of_use.our_services.training_courses')}
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.training_program')}
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.our_services.become_a_partner')}
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.our_partnership')}
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.our_services.become_a_registered')}
        </strong>
        <br />
        { I18n.t('about.term_of_use.our_services.becoming_a_teclib')}
      </p>
      <p>
        <u>
          <strong>
            IV.
            {' '}
            { I18n.t('about.term_of_use.title') }
          </strong>
        </u>
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.obligations') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.authority') }
        <br />
        { I18n.t('about.term_of_use.general_conditions.identifying') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.our_obligations') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.reasonable_steps') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.force_majeure') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.no_case') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.exclusions_and_limitations') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.representations') }
        {' '}
        <br />
        { I18n.t('about.term_of_use.general_conditions.published') }
      </p>
      <p>
        { I18n.t('about.term_of_use.general_conditions.limitation') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.changes') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.any_time') }
      </p>
      <p>
        { I18n.t('about.term_of_use.general_conditions.outgoing_web_links') }
        <br />
        { I18n.t('about.term_of_use.general_conditions.outgoing_links') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.ownership') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.all_rights') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.third_party_rights') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.not_intended') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.competent_jurisdiction') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.relationship') }
      </p>
      <p>
        <strong>
          { I18n.t('about.term_of_use.general_conditions.privacy_policy') }
        </strong>
        <br />
        { I18n.t('about.term_of_use.general_conditions.you_agree') }
      </p>
    </div>
  </ContentPane>
)

export default TermsOfUse
