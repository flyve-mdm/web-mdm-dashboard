import React from 'react'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"

const Overview = () => {
  return (
    <ContentPane>
      <h2>{I18n.t('about.overview.title')}</h2>
        <div className="aboutPane">
            <p>{I18n.t('about.overview.flyve_MDM_is_a_mobile_device_management_software_that_enables_you_to_secure_and_manage_all_the_mobile_devices_of_your_business_via_a_unique_web-based_console_(MDM)')}</p>
            <p>{I18n.t('about.overview.our_solution_allows_you_to_efficiently_and_easily_control_any_aspects_of_your_Android-based_mobile_fleet,_providing_a_panel_of_functionalities')}</p>
            <ul>
                <li>{I18n.t('about.overview.provided_as_sass_platform')}</li>
                <li>{I18n.t('about.overview.google_indepent')}</li>
                <li>{I18n.t('about.overview.deploy_and_configure_applications')}</li>
                <li>{I18n.t('about.overview.deploy_files')}</li>
                <li>{I18n.t('about.overview.wipe_a_phone')}</li>
                <li>{I18n.t('about.overview.work_with_devices_running_Android_4,4_or_higher')}</li>
                <li>{I18n.t('about.overview.simple_web_application_user_interface')}</li>
            </ul>
            <p>{I18n.t('about.overview.source_codes_will_be_released_during_fall_2016')}</p>
        </div>
    </ContentPane>
  )
}

export default Overview