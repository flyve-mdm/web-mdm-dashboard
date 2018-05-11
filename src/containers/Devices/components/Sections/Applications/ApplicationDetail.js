import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import itemtype from '../../../../../shared/itemtype'
import Loading from '../../../../../components/Loading'
import { I18n } from 'react-i18nify'
import EmptyMessage from '../../../../../components/EmptyMessage'

export default class Applications extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            software: undefined
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                software: await this.props.glpi.getAnItem({itemtype: itemtype.Software, id: this.props.id}),
                isLoading: false
            })
        } catch (error) {
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        return (
            this.state.isLoading ?
                <Loading message={`${I18n.t('commons.loading')}...`}/> :
                (
                    this.state.software ?
                        "":
                        <EmptyMessage message={I18n.t('commons.problems_loading_data')}/>
                )
        )
    }
}
Applications.propTypes = {
    id: PropTypes.number.isRequired,
    glpi: PropTypes.object.isRequired
}
