import React, { Component } from "react"
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'

class ContentPane extends Component {
    
    render() {
        if (this.props.selectedIndex === null) {
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
            )
        } else {
            let selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div className="profileHeader">
                        <h2 className="win-h2" style={{ margin: '20.1px 0' }}> User </h2>
                        <div className="personInfo">
                            <IconItemList backgroundUrl={selectedItemList['User.picture']} size={100} />
                            <div className="profileStatus">
                                <div className="message">
                                    <b>
                                        {selectedItemList['User.name']}
                                    </b>
                                </div>
                                <span className="message">
                                    {selectedItemList['User.Profile_User.Profile.name']}
                                </span>
                                <span className="source">Joined {selectedItemList['User.date_creation']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="profileContent">
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
                </div>
            )
        }
    }
}

ContentPane.propTypes = {
    // selectedIndex: PropTypes. ,
    itemList: PropTypes.object.isRequired,
    itemListPaneWidth: PropTypes.number.isRequired
}

export default ContentPane
