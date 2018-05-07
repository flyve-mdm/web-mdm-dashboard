import React from 'react'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"

const Overview = () => {
  return (
    <ContentPane>
      <h2 style={{ margin: '10px' }}>{I18n.t('about.overview.title')}</h2>
      <div className="about-pane" style={{ margin: '10px' }}>
            <p>{I18n.t('about.overview.flyve_mdm_is')}</p>
            <p>{I18n.t('about.overview.our_solution')}</p>
            <ul>
                <li>{I18n.t('about.overview.provided_as_sass_platform')}</li>
                <li>{I18n.t('about.overview.google_indepent')}</li>
                <li>{I18n.t('about.overview.deploy_and_configure')}</li>
                <li>{I18n.t('about.overview.deploy_files')}</li>
                <li>{I18n.t('about.overview.wipe_phone')}</li>
                <li>{I18n.t('about.overview.work_with_devices')}</li>
                <li>{I18n.t('about.overview.simple_web_application')}</li>
            </ul>
            <p>{I18n.t('about.overview.source_codes')}</p>
        </div>
    </ContentPane>
  )
}

export default Overview