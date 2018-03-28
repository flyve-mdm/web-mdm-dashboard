import React from 'react'
import ReactMarkdown from 'react-markdown'
import CHANGELOG from './CHANGELOG.md'
import ContentPane from '../../../../components/ContentPane'

const ReleaseNotes = () => (
  <ContentPane>
    <h2>Release Notes</h2>
    <div className="aboutPane">
      <ReactMarkdown source={CHANGELOG} />
    </div>
  </ContentPane>
)

export default ReleaseNotes