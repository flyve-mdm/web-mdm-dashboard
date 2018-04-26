import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import withGLPI from '../../../hoc/withGLPI'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import EmptyMessage from '../../../components/EmptyMessage'

class DevicesAssociated extends Component {

    constructor(props) {
        super(props)
        this.state = {
            devices: undefined,
            isLoading: true
        }
    }

    componentDidMount = async () => {
        try {
            const { name } = await this.props.glpi.getAnItem({itemtype: itemtype.PluginFlyvemdmFleet, id: getID(this.props.history.location.pathname)})
            
            const devices = await this.props.glpi.searchItems({
                itemtype: itemtype.PluginFlyvemdmAgent,
                criteria: 
                [
                    {
                        link: 'and',
                        field: 3,
                        searchtype: 'contains',
                        value: name
                    }
                ]
            })
            this.setState({ 
                devices,
                isLoading: false
            })
        } catch (error) {
            this.setState({
                isLoading: false
            })
        }
    }

    render () {
        return (
            <ContentPane>
                {
                    this.state.isLoading ? 
                        <Loading message={`${I18n.t('commons.loading')}...`} /> :
                        (
                            (!this.state.devices || this.state.devices.totalcount === 0) ? 
                                <EmptyMessage message={I18n.t('fleets.no_associated_devices')}/> :
                                (
                                    ''
                                )
                        )
                }
            </ContentPane>
        )
    }
}

DevicesAssociated.propTypes = {
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default withGLPI(DevicesAssociated)