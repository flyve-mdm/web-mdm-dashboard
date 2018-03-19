import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditMultiple extends Component {
    render() {
        return ""
    }
}
EditMultiple.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
