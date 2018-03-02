import React from 'react'
import ReactMarkdown from 'react-markdown'

import CHANGELOG from './CHANGELOG.md'
import Title from '../../../../components/Title'

const ReleaseNotes = () => (
  <React.Fragment>
    <Title text="Release Notes"/>
    <div className="contentMarkdown aboutPane">
      <ReactMarkdown source={CHANGELOG} />
    </div>
  </React.Fragment>
)

export default ReleaseNotes