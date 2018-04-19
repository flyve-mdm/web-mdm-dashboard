import React from 'react'
import ReactMarkdown from 'react-markdown'
import CHANGELOG from './CHANGELOG.md'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"

const ReleaseNotes = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>{I18n.t('about.release_notes.title')}</h2>
    <div className="aboutPane" style={{ margin: '10px' }}>
      <ReactMarkdown source={CHANGELOG} />
    </div>
  </ContentPane>
)

export default ReleaseNotes