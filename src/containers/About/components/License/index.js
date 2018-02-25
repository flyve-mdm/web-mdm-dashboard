import React from 'react'
import ReactMarkdown from 'react-markdown'

import LICENCE from './LICENCE.md'
import Title from '../../../../components/Title'

const Licence = () => (
  <div>
    <Title text="Licence"/>
    <div className="contentMarkdown aboutPane">
      <ReactMarkdown source={LICENCE} />
    </div>
  </div>
)

export default Licence