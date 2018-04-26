import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import withGLPI from '../../../hoc/withGLPI'


class DevicesAssociates extends Component {
    render () {
        return (
            <ContentPane>

            </ContentPane>
        )
    }
}

DevicesAssociates.propTypes = {
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default withGLPI(DevicesAssociates)