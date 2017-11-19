import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'

export default class FleetsAdd extends Component {
    render() {
        return (
            <ReactWinJS.Pivot>
                <ReactWinJS.Pivot.Item key="main" header="Main">
                    <div>Main Screen</div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="policies" header="Policies">
                    <div>Policies </div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="applications" header="Applications">
                    <div>Applications</div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="files" header="Files">
                    <div>Files</div>
                </ReactWinJS.Pivot.Item>
            </ReactWinJS.Pivot>
        )
    }
}
