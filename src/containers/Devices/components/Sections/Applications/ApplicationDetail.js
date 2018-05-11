import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import itemtype from '../../../../../shared/itemtype'
import Loading from '../../../../../components/Loading'
import { I18n } from 'react-i18nify'

export default class Applications extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        return (
            this.state.isLoading ?
                <Loading message={`${I18n.t('commons.loading')}...`}/> :
                ''
        )
    }
}
Applications.propTypes = {
    id: PropTypes.number.isRequired,
    glpi: PropTypes.object.isRequired
}
