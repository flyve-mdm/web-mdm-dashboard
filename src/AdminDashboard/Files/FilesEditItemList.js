import React, { Component } from 'react'

export default class FilesEditItemList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: ''
        }
    }

    componentDidMount() {
        this.setState({
            input: this.props.currentItem["PluginFlyvemdmFile.name"]
        })
    }

    changeInput = (e) => {
        this.setState({input: e.target.value})
    }

    blurInput = (e) => {
        if (e.target.value.trim() !== "") {
            this.props.updateItemList(this.props.currentItem["PluginFlyvemdmFile.id"], e.target.value)
        }
    }

    render() {
    return (

        <div className='files-list' >
            <div className='files-list-content'>
                <div className='files-list-item'>
                    <div className='item-content-primary'>
                        <input 
                        type="text"
                        style={{ width: '240px'}}
                        className="win-textbox" 
                        placeholder="Fleet name"
                        name="input"
                        value={this.state.input}
                        onChange={this.changeInput}
                        onBlur={this.blurInput}
                        required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
