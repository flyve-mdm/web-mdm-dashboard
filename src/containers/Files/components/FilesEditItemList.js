import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'

export default class FilesEditItemList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            input: ''
        }
    }

    componentDidMount() {
        this.setState({
            input: this.props.selectedItem["PluginFlyvemdmFile.name"]
        })
    }

    changeInput = (e) => {
        this.setState({input: e.target.value})
    }

    blurInput = (e) => {
        if (e.target.value.trim() !== "") {
            this.props.updateItemList(this.props.selectedItem["PluginFlyvemdmFile.id"], e.target.value)
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
                            placeholder={I18n.t('files.input_name')}
                            name="input"
                            value={this.state.input}
                            onChange={this.changeInput}
                            onBlur={this.blurInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
FilesEditItemList.propTypes = {
    selectedItem: PropTypes.object.isRequired,
    updateItemList: PropTypes.func.isRequired
}

