import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import itemtype from '../../../../../shared/itemtype'
import Loading from '../../../../../components/Loading'
import { I18n } from 'react-i18nify'
import EmptyMessage from '../../../../../components/EmptyMessage'
import { Input, TextArea } from '../../../../../components/Forms'
import toDateInputValue from '../../../../../shared/toDateInputValue'

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
            const software = await this.props.glpi.getAnItem({itemtype: itemtype.Software, id: this.props.id})
            this.setState({
                software,
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
                        (
                            <React.Fragment>
                                <h3>{`${I18n.t('commons.application')} ${this.props.id}`}</h3>
                                <Input label={I18n.t('commons.name')} name="name" type="text" value={this.state.software.name} disabled />
                                <Input label={I18n.t('commons.date_creation')} name="comment" type="date" value={toDateInputValue(this.state.software.date_creation)} disabled />
                                <Input label={I18n.t('commons.date_mod')} name="comment" type="date" value={toDateInputValue(this.state.software.date_mod)} disabled />
                                <TextArea label={I18n.t('commons.comments')} name="comment" type="textArea" value={this.state.software.comment} disabled />
                                <button className="btn btn--secondary">{I18n.t('commons.back')}</button>
                            </React.Fragment>
                        ):
                        <EmptyMessage message={I18n.t('commons.problems_loading_data')}/>
                )
        )
    }
}
Applications.propTypes = {
    id: PropTypes.number.isRequired,
    glpi: PropTypes.object.isRequired
}
