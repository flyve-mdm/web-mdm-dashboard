import React from 'react'
import ReactMarkdown from 'react-markdown'

import LICENCE from './LICENCE.md'
import Title from '../../../../components/Title'

const Licence = () => (
  <React.Fragment>
    <Title text="Release Notes"/>
    <div className="contentMarkdown aboutPane">
      <ReactMarkdown source={LICENCE} />
    </div>
  </React.Fragment>
)

export default Licence