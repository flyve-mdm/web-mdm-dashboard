import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from "react-i18nify"

const EmptyMessage = props => (
    <div className="center-block-content">
        <h1 className="win-h1" style={{ color: 'grey' }}> 
            { props.message } 
        </h1>
    </div>
)

EmptyMessage.propTypes = {
    itemListPaneWidth: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
}

EmptyMessage.defaultProps = {
    itemListPaneWidth: 320,
    message: I18n.t('commons.no_selection')
}

export default EmptyMessage