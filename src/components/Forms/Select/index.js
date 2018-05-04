import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Select extends Component {

    constructor (props) {
        super(props)
        this.state = {
            options: this.props.options
        }
    }

    change = (eventObject) => {
        this.props.function(this.props.name, eventObject.target.value)
    }

    listRequest = async () => {
        let options = []
        let response = await this.props.glpi[this.props.request.method](this.props.request.params)

        switch (this.props.request.method) {
            case 'getMyProfiles':
                response.myprofiles.forEach(element => {
                    options.push(
                        {
                            content: element[this.props.request.content],
                            value: element[this.props.request.value]
                        }
                    )
                })
                break
            
            case 'searchItems':
                if (response.data) {
                    if (response.totalcount !== response.count) {
                        let params = {
                            itemtype: this.props.request.params.itemtype, 
                            options: {
                                ...this.props.request.params.options,
                                range: `0-${response.totalcount - 1}`
                            }
                        }
                        response = await this.props.glpi[this.props.request.method](params) 
                    }

                    response.data.forEach(element => {
                        options.push(
                            {
                                content: element[this.props.request.content],
                                value: element[this.props.request.value]
                            }
                        )
                    })
                }
                break
                case 'getAllItems':
                if (response) {
                    response.forEach(element => {
                        options.push(
                            {
                                content: element[this.props.request.content],
                                value: element[this.props.request.value]
                            }
                        )
                    })
                }
                break

            case 'getSubItems':
                response.forEach(element => {
                    options.push(
                        {
                            content: element[this.props.request.content],
                            value: element[this.props.request.value]
                        }
                    )
                })    
                break
            case 'getMyEntities':
                response.myentities.forEach(element => {
                    options.push(
                        {
                            content: element[this.props.request.content],
                            value: element[this.props.request.value]
                        }
                    )
                }) 
                break
            default:
                break
        }

        this.setState({ options })
    }

    componentDidMount = () => {
        if (this.props.glpi && this.props.request) {
            this.listRequest()
        } else {
            this.handleRefresh(this.state.options)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.options !== nextProps.options) {
            this.handleRefresh(nextProps.options)
            return true
        }
        if (this.state.options !== nextState.options) {
            return true
        }
        return false
    }

    handleRefresh = async (options) => {
        let optionsList = []
        options.forEach(element => {
            if (!element.name) {
                optionsList.push(
                    {
                        value: element,
                        content: element
                    }
                )
            } else {
                optionsList.push(
                    {
                        value: element.value,
                        content: element.name
                    }
                )
            }
        })
        this.setState ({ options: optionsList })
    }

    render() {
        return (
            <div className="froms__col">
                <p>{this.props.label}</p>
                <select name={this.props.name} value={this.props.value} onChange={this.change}>
                        <option>
                            ---
                        </option>
                    {   
                        this.state.options.map((element, index) => {
                            return (
                                <option value={element.value} key={`${this.props.name}${index}`}>
                                    { element.content }
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}

Select.defaultProps = {
    options: []
}

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    options: PropTypes.array,
    function: PropTypes.func,
    glpi: PropTypes.object,
    request: PropTypes.object
}

export default Select
    