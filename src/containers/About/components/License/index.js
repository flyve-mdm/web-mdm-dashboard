import React from 'react'
import ReactMarkdown from 'react-markdown'

import LICENCE from './LICENCE.md'

const Licence = () => (
  <div>
    <h2>Licence</h2>
    <div className="aboutPane">
      <ReactMarkdown source={LICENCE} />
    </div>
  </div>
)

export default Licence