import React from 'react'
import ReactMarkdown from 'react-markdown'

import CHANGELOG from './CHANGELOG.md'
import Title from '../../../../components/Title'

const ReleaseNotes = () => (
  <div>
    <Title text="Release Notes"/>
    <div className="contentMarkdown aboutPane">
      <ReactMarkdown source={CHANGELOG} />
    </div>
  </div>
)

export default ReleaseNotes