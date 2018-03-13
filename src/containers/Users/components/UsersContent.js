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
            data: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItems !== prevProps.selectedItems) {
            this.setState({
                data: undefined
            })
            this.handleRefresh()
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
                data: await this.props.glpi.getAnItem({ itemtype: 'User', id: this.props.selectedItems[0]['User.id'] }) 
            })
        } catch (error) {
            this.props.setNotification({
                title: "Error",
                body: "There was a problem loading this user's data",
                type: 'alert'
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
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.changeAction('EditOne')} />
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
                                    <div className="number">{this.state.data.mobile}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href={"tel:" + this.state.data.phone2}>Call Work</a>
                                    <div className="number">{this.state.data.phone2}</div>
                                </div>
                            </li>
                            <li>
                                <span className="emailIcon" />
                                <div className="callContent">
                                    <a href={"mailto:" + this.props.selectedItems[0]['User.UserEmail.email']}>Email</a>
                                    <div className="number">{this.props.selectedItems[0]['User.UserEmail.email']}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Confirmation title="Delete Users" message={this.state.data.name} reference={el => this.contentDialog = el} />
                </div>
            )
        }
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} updateAnimation={true}>
                { renderComponent }
            </ContentPane>
        ) 
    }
}
UsersContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItems: PropTypes.array,
    history: PropTypes.object.isRequired,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired
}