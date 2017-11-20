import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'

export default class FleetsAdd extends Component {
    render() {
        return (
            <ReactWinJS.Pivot>
                <ReactWinJS.Pivot.Item key="main" header="Main">
                <div style={{ width: '320px', padding: '10px'}}>
                    <input className="win-textbox" type="text" placeholder="Fleet Name"/>
                </div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="policies" header="Policies">
                    <div>Policies </div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="applications" header="Applications">
                    <div>
                        <p>Choose here the applications which you want automatically installed on the devices with this fleet</p>
                        <h2>Current Applications for this Fleet</h2>
                        <p>No application choosen to be installed for the devices that are/will-be in this Fleet</p>
                        <h2>Add Applications for this fleet</h2>
                        <p>No available applications to the fleet.</p>
                    </div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="files" header="Files">
                    <div style={{ padding: '10px' }}>
                        <input className="win-textbox" type="file" placeholder="Fleet Name" multiple />
                    </div>
                </ReactWinJS.Pivot.Item>
            </ReactWinJS.Pivot>
        )
    }
}
