import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import itemtype from '../../../../../shared/itemtype'
import Loading from '../../../../../components/Loading'
import { I18n } from 'react-i18nify'
import EmptyMessage from '../../../../../components/EmptyMessage'
import ConstructInputs from '../../../../../components/Forms'
import { softwareScheme } from '../../../../../components/Forms/Schemas'
import validateData from "../../../../../shared/validateData"

export default class Applications extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            error: false
        }
    }

    componentDidMount = async () => {
        try {
            const software = await this.props.glpi.getAnItem({itemtype: itemtype.Software, id: this.props.id})
            console.log(software)
            this.setState({
                name: validateData(software.name),
                location: {
                    value: validateData(software.locations_id),
                    request: {
                        params: {itemtype: itemtype.Location, options: {forcedisplay: [2]}},
                        method: 'searchItems',
                            content: '1',
                            value: '2'
                    }
                }
                isLoading: false
            })
        } catch (error) {
            this.setState({
                isLoading: false,
                error: true
            })
        }
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    changeSelect = (name, value) => {
        this.setState({
            [name]: {
                ...this.state[name],
                value
            }
        })
    }

    render() {
        return (
            this.state.isLoading ?
                <Loading message={`${I18n.t('commons.loading')}...`}/> :
                (
                    !this.state.error ?
                        (
                            <React.Fragment>
                                <h3>{`${I18n.t('commons.application')} ${this.props.id}`}</h3>
                                <ConstructInputs data={softwareScheme({state: this.state, changeState: this.changeState, changeSelect: this.changeSelect, glpi: this.props.glpi}).softwareInformation} />
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
