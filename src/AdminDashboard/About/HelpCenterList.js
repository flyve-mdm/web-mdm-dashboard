import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import PropTypes from 'prop-types'
let WinJS = require('winjs')

export default class HelpCenterList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List([
                { title: "How to enroll a device" },
                { title: "How to add a fleet" }
            ]),
            layout: { type: WinJS.UI.ListLayout }
        }
    }

    itemRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {item.data.title}
            </div>
        )
    })

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    render() {
      return (
          <div className="listPane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
              <ReactWinJS.ListView
                  ref="listView"
                  className="contentListView win-selectionstylefilled"
                  style={{ height: 'calc(100% - 48px)' }}
                  itemDataSource={this.state.list.dataSource}
                  itemTemplate={this.itemRenderer}
                  layout={this.state.layout}
                  selectionMode="single"
                  tapBehavior="directSelect"
                  onContentAnimating={this.handleContentAnimating}
                //   onSelectionChanged={this.handleSelectionChanged}
              />
          </div>
      )
    }
}