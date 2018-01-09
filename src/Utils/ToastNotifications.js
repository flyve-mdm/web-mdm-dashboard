
import React, { Component } from 'react'
import WinJS from 'winjs'

class ToastNotifications extends Component {

    constructor (props) {
        super(props)
        this.state = {
            show: false,
            title: '',
            body: '',
            type: '',
            timer: {}
        }
    }

    showNotification = (title, body = '', type = 'success') => {
        this.setState({
            show: true,
            title,
            body,
            type
        }, () => {
            WinJS.UI.Animation.enterContent(
                document.getElementsByClassName('toast'), { top: '0px', left: '30px', rtlflip: true }, { mechanism: "transition" }
            )
            this.setState({
                timer: setTimeout(() => {
                    this.removeNotification()
                }, 2000)
            })
        })
    }

    removeNotification = () => {
        WinJS.UI.Animation.exitContent(
            document.getElementsByClassName('toast'), { top: '0px', left: '20px' }
        ).then(() => {
            this.setState({
                show: false
            })
        })
    }

    renderNotification = () => {
        let render = <div/>
        if (this.state.show) {
            render = (
                <div className={`toast toast-${this.state.type}`}>
                    <span className="cancelIcon" style={{ float: 'right', cursor: 'pointer' }} onClick={()=> {
                        clearTimeout(this.state.timer)
                        this.removeNotification()
                    }}/>
                    <div className="toast-title">
                        { this.state.title }
                    </div>
                    <div className="toast-body">
                        { this.state.body }
                    </div>
                </div>
            )
        }
        
        return render
    }
 
    render () {
        return this.renderNotification()
    }
}

export default ToastNotifications