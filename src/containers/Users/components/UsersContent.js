import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import IconItemList from '../../../components/IconItemList'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'

export default class UsersContent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: this.props.history.location.pathname.split("/")[3],
            data: undefined
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== newProps.history.location.pathname.split("/")[3]) {
            this.setState({
                data: undefined,
                id: newProps.history.location.pathname.split("/")[3]
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
                await this.props.glpi.deleteItem({ itemtype: 'User', input: itemListToDelete })
                this.props.setNotification({
                    title: 'Success',
                    body: 'Elements successfully removed',
                    type: 'success'
                })
                this.props.history.push("/app/users")
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
            this.setState({ 
                data: await this.props.glpi.getAnItem({ 
                    itemtype: 'User', 
                    id: this.state.id 
                }) 
            })
        } catch (error) {
            this.props.setNotification({
                title: "Error",
                body: "There was a problem loading this user's data",
                type: "alert"
            }) 
            this.props.history.push("/app/users")
        }
    }

    render() {
        let renderComponent 
        if (this.state.data === undefined) {
            renderComponent = <Loading message="Loading..."/>
        } else {
            let imageProfile = this.state.data.picture ? this.state.data.picture : "profile.png"
            renderComponent = (
                <div>
                    <div className="contentHeader">
                        <h2 className="win-h2" style={{ margin: '20.1px 0' }}> User </h2>
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
                                <span className="source">Joined {this.state.data.date_creation}</span>
                                <br />
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.history.push(`/app/users/${this.state.id}/edit`)} />
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
                                    <a href={"tel:" + this.state.data.mobile}>Call Mobile</a>
                                    <div>{this.state.data.mobile}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href={"tel:" + this.state.data.phone2}>Call Work</a>
                                    <div>{this.state.data.phone2}</div>
                                </div>
                            </li>
                            <li>
                                <span className="emailIcon" />
                                <div className="callContent">
                                    <a href={"mailto:" + this.state.data['User.UserEmail.email']}>Email</a>
                                    <div>{this.state.data['User.UserEmail.email']}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Confirmation title="Delete Users" message={this.state.data.name} reference={el => this.contentDialog = el} />
                </div>
            )
        }
        return (
            <ContentPane updateAnimation={true}>
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
