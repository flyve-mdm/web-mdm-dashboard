import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import IconItemList from '../IconItemList'
import Confirmation from '../../Utils/Confirmation'

export default class UsersContent extends Component {

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {
            let item = this.props.dataSource.itemList
            let index = this.props.selectedIndex
            index.sort()
            index.reverse()
            index.forEach((i) => {
                item.splice(i, 1)
            })

            this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
            this.props.onNavigate([this.props.location[0]])
        }
    }

    render() {
        let selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)
        let imageProfile = selectedItemList['User.picture'] ? selectedItemList['User.picture'] : "profile.png"
        let nameProfile

        if (typeof selectedItemList['User.Profile_User.Profile.name'] === 'string') {
            nameProfile = (<span key={selectedItemList['User.Profile_User.Profile.name']} className="message" >{selectedItemList['User.Profile_User.Profile.name']}<br /></span>)
        } else {
            nameProfile = selectedItemList['User.Profile_User.Profile.name'].map((name, index) => {
                return (<span key={index} className="message" >{name}<br /></span>)
            })
        }
        
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="contentHeader">
                    <h2 className="win-h2" style={{ margin: '20.1px 0' }}> {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        <IconItemList image={imageProfile} size={100} />
                        <div className="contentStatus">
                            <div className="name">
                                <b>
                                    {selectedItemList['User.realname']}
                                </b>
                            </div>
                            
                            { nameProfile }
                            
                            <span className="source">Joined {selectedItemList['User.date_creation']}</span>
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
                                <a href={"tel:" + selectedItemList['User.mobile']}>Call Mobile</a>
                                <div className="number">{selectedItemList['User.mobile']}</div>
                            </div>
                        </li>
                        <li>
                            <span className="phoneIcon" />
                            <div className="callContent">
                                <a href={"tel:" + selectedItemList['User.phone2']}>Call Work</a>
                                <div className="number">{selectedItemList['User.phone2']}</div>
                            </div>
                        </li>
                        <li>
                            <span className="emailIcon" />
                            <div className="callContent">
                                <a href={"mailto:" + selectedItemList['User.UserEmail.email']}>Email</a>
                                <div className="number">{selectedItemList['User.UserEmail.email']}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList["User.realname"]} reference={el => this.contentDialog = el} />
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
    selectedItemList: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired
}