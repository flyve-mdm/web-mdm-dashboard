import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import IconItemList from '../IconItemList'

export default class UsersContent extends Component {
  render() {
        let selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)
        let imageProfile = selectedItemList['User.picture'] ? selectedItemList['User.picture'] : "profile.png"
        
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="contentHeader">
                    <h2 className="win-h2" style={{ margin: '20.1px 0' }}> User </h2>
                    <div className="itemInfo">
                        <IconItemList image={imageProfile} size={100} />
                        <div className="contentStatus">
                            <div className="name">
                                <b>
                                    {selectedItemList['User.realname']}
                                </b>
                            </div>
                            <span className="message">
                                {selectedItemList['User.Profile_User.Profile.name']}
                            </span>
                            <span className="source">Joined {selectedItemList['User.date_creation']}</span>
                            <br />
                            <span className="editIcon" onClick={() => this.props.changeActionList('Edit')} />
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
    selectedIndex: PropTypes.array,
    changeActionList: PropTypes.func.isRequired
}