import React from 'react'
import ReactMarkdown from 'react-markdown'
import LICENCE from './LICENCE.md'
import ContentPane from '../../../../components/ContentPane'

const Licence = () => (
  <ContentPane>
    <h2>Licence</h2>
    <div className="aboutPane">
      <ReactMarkdown source={LICENCE} />
    </div>
  </ContentPane>
)

export default Licence