import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import IconItemList from '../IconItemList'
import Confirmation from '../../Utils/Confirmation'
import Loading from '../../Utils/Loading'

export default class UsersContent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                data: undefined
            })
            this.handleRefresh()
        }
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.props.selectedItemList.map((item) => {
                return {
                    id: item["User.id"]
                }
            })

            this.setState({
                isLoading: true
            })
            this.props.changeActionList("Delete")

            this.props.glpi.deleteItem({ itemtype: 'User', input: itemListToDelete })
            .then((response) => {
                this.props.showNotification('Success', 'elements successfully removed')
                this.props.changeActionList(null)
                this.props.changeSelectionMode(false)
                this.props.onNavigate([this.props.location[0]])
            })
            .catch((error) => {
                if (error.length > 1) {
                    this.props.showNotification(error[0], error[1])
                }
            })
        }
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.props.selectedItemList.map((item) => {
                return {
                    id: item["User.id"]
                }
            })

            this.setState({
                isLoading: true
            })
            this.props.changeActionList("Delete")

            this.props.glpi.deleteItem({ itemtype: 'User', input: itemListToDelete })
            .then((response) => {
                this.props.showNotification('Success', 'elements successfully removed')
                this.props.changeActionList(null)
                this.props.changeSelectionMode(false)
                this.props.onNavigate([this.props.location[0]])
            })
            .catch((error) => {
                if (error.length > 1) {
                    this.props.showNotification(error[0], error[1])
                }
            })
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        this.props.glpi.getAnItem({ itemtype: 'User', id: this.props.selectedItemList[0]['User.id'] })
            .then((response) => {
                this.setState({
                    data: response
                })
            })
            .catch((error) => {

            })
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
                        <h2 className="win-h2" style={{ margin: '20.1px 0' }}> {Pluralize.singular(this.props.location[0])} </h2>
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
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.changeActionList('EditOne')} />
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
                                    <a href={"mailto:" + this.props.selectedItemList[0]['User.UserEmail.email']}>Email</a>
                                    <div className="number">{this.props.selectedItemList[0]['User.UserEmail.email']}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.data.name} reference={el => this.contentDialog = el} />
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
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}