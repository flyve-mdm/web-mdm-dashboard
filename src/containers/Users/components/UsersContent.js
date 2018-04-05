import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import IconItemList from '../../../components/IconItemList'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import location from '../../../shared/location'

export default class UsersContent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: getID(this.props.history.location.pathname),
            data: undefined,
            emails: []
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== getID(this.props.history.location.pathname)) {
            this.setState({
                data: undefined,
                emails: [],
                id: getID(this.props.history.location.pathname)
            }, () => this.handleRefresh())
        }
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.props.selectedItems.map((item) => {
                return {
                    id: item["User.id"]
                }
            })

            this.setState({
                isLoading: true
            })

            this.props.changeAction("reload")            
            this.props.changeSelectionMode(false)
            
            try {
                await this.props.glpi.deleteItem({ itemtype: itemtype.User, input: itemListToDelete })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.elements_successfully_removed'),
                    type: 'success'
                })
                this.props.history.push(`${location.pathname}/app/users`)
            } catch (error) {                
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
            
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        try {
            const user = await this.props.glpi.getAnItem({
                itemtype: itemtype.User,
                id: this.state.id
            }) 

            const emails = await this.props.glpi.getSubItems({
                itemtype: itemtype.User,
                id: this.state.id,
                subItemtype: 'UserEmail'
            })
            this.setState({ 
                data: user,
                emails 
            })
        } catch (error) {
            this.props.setNotification({
                title: I18n.t('commons.error'),
                body: I18n.t('notifications.problems_loading_data'),
                type: "alert"
            }) 
            this.props.history.push(`${location.pathname}/app/users`)
        }
    }

    render() {
        let renderComponent 
        if (this.state.data === undefined) {
            renderComponent = <Loading message={`${I18n.t('commons.loading')}...`}/>
        } else {
            let imageProfile = this.state.data.picture ? this.state.data.picture : "profile.png"
            renderComponent = (
                <div>
                    <div className="contentHeader">
                        <div className="itemInfo">
                            <IconItemList image={imageProfile} size={100} />
                            <div className="contentStatus">
                                <div className="name">
                                    <b>
                                        {this.state.data.name}
                                    </b>
                                </div>
                                
                                <span className="message" >
                                    {this.state.data.realname}
                                </span>
                                <br />
                                <span className="source">
                                    {I18n.t('commons.joined')} {this.state.data.date_creation}
                                </span>
                                <br />
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.history.push(`${location.pathname}/app/users/${this.state.id}/edit`)} />
                                <span className="deleteIcon" onClick={this.handleDelete} />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="contentInfo">
                        <ul>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href={this.state.data.mobile ? "tel:" + this.state.data.mobile : "#call"}>
                                        {I18n.t('commons.call_mobile')}
                                    </a>
                                    <div>
                                        {this.state.data.mobile ? this.state.data.mobile : I18n.t('commons.not_available')}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href={this.state.data.phone2 ? "tel:" + this.state.data.phone2 : "#call"}>
                                        {I18n.t('commons.call_work')}
                                    </a>
                                    <div>
                                        {this.state.data.phone2 ? this.state.data.phone2 : I18n.t('commons.not_available')}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span className="emailIcon" />
                                <div className="callContent">
                                    <a href={this.state.emails.length > 0 ? "mailto:" + this.state.emails[0]["email"] : "#email"}>
                                        {I18n.t('commons.email')}
                                    </a>
                                    <div>
                                        {this.state.emails.length > 0 ? this.state.emails[0]["email"] : I18n.t('commons.not_available')}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Confirmation title={I18n.t('users.delete_one')} message={this.state.data.name} reference={el => this.contentDialog = el} />
                </div>
            )
        }
        return (
            <ContentPane>
                { renderComponent }
            </ContentPane>
        ) 
    }
}
UsersContent.propTypes = {
    selectedItems: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
