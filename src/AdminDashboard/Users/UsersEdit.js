import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import EmptyMessage from '../../Utils/EmptyMessage'
import Loading from '../../Utils/Loading'
import { Select, Input } from '../../Utils/Forms'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItemList],
            isLoading: false,
            field: undefined,
            newValue: ''
        }
    }

    handleSaveDevices = async () => {
        this.setState({
            isLoading: true
        })
    }

    changeField = (name, value) => {
        this.setState({
            field: value
        })
    }

    render() {
        if (this.props.selectedItemList) {

            let renderComponent
            if (this.state.isLoading) {
                renderComponent = <Loading message="Loading..." />
            } else {
                let input
                switch (this.state.field) {
                    case 'Realname':
                    case 'First name':
                    case 'Phone':
                    case 'Phone 2':
                    case 'Mobile phone':
                    case 'Administrative number':
                        input = (
                            <Input
                                label="What will be the new value?"
                                type="text"
                                name="newValue"
                                value={this.state.newValue}
                            />
                        )
                    break
                
                    default:
                        break
                }
                renderComponent = (
                    <div>
                        {input}
                    </div>
                )
            }              

            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit {this.props.location[0]} </h2>
                        <h4  className="win-h4">
                            Select the field that you want to update
                        </h4>
                        <Select
                            name="field"
                            value={this.state.field}
                            options={[
                                'Realname',
                                'First name',
                                'Title',
                                'Location',
                                'Default profile',
                                'Password',
                                'Valid since',
                                'Valid until',
                                'Phone',
                                'Phone 2',
                                'Mobile phone',
                                'Administrative number',
                                'Category',
                                'Default entity',
                                'Comments'
                            ]}
                            function={this.changeField}
                        />
                        
                        {renderComponent}

                        <br/>
                        
                        <button className="win-button win-button-primary" onClick={this.handleSaveDevices}>
                            Save
                        </button>
                    </div>
                </ContentPane>
            )

        } else {
            return (
                <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }
    }
}
DevicesEdit.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
