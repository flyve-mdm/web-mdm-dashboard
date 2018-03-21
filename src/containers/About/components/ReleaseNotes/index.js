import React from 'react'
import ReactMarkdown from 'react-markdown'
import CHANGELOG from './CHANGELOG.md'

const ReleaseNotes = () => (
  <div>
    <h2>Release Notes</h2>
    <div className="contentMarkdown aboutPane">
      <ReactMarkdown source={CHANGELOG} />
    </div>
  </div>
)

export default ReleaseNotes