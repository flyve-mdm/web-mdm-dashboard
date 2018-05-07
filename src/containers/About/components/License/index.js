import React from 'react'
import ReactMarkdown from 'react-markdown'
import LICENCE from './LICENCE.md'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"

const Licence = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>{I18n.t('about.license.title')}</h2>
    <div className="about-pane" style={{ margin: '10px' }}>
      <ReactMarkdown source={LICENCE} />
    </div>
  </ContentPane>
)

export default Licence 