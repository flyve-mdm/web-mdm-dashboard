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
                        <div className="name">{selectedItemList['User.name']}</div>
                        <div className="personInfo">
                            <IconItemList backgroundUrl={selectedItemList['User.picture']} size={100} />
                            <div className="profileStatus">
                                <span className="message">
                                    {selectedItemList['User.Profile_User.Profile.name']}
                                </span>
                                <span className="source">{selectedItemList['User.last_login']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="profileContent">
                        <ul>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Mobile</a>
                                    <span>{}</span>
                                    <div className="number">{selectedItemList['User.mobile']}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Work</a>
                                    <div className="number">{selectedItemList['User.phone2']}</div>
                                </div>
                            </li>
                            <li>
                                <span className="emailIcon" />
                                <a href="mail:{}">Email</a>
                            </li>
                            <li><span className="cellphoneIcon" />Divice</li>
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
