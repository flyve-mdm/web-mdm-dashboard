import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Select extends Component {

    constructor (props) {
        super(props)
        this.state = {
            options: this.props.options ? this.props.options : []
        }
    }

    change = (eventObject) => {
        this.props.function(this.props.name, eventObject.target.value)
    }

    listRequest = async (props) => {
        let options = []
        let response = await props.glpi[props.request.method](props.request.params)

        switch (props.request.method) {
            case 'getMyProfiles':
                response.myprofiles.forEach(element => {
                    options.push(
                        {
                            content: element[props.request.content],
                            value: element[props.request.value]
                        }
                    )
                })
                break
            
            case 'searchItems':
                if (response.data) {
                    if (response.totalcount !== response.count) {
                        let params = {
                            itemtype: props.request.params.itemtype, 
                            options: {
                                ...props.request.params.options,
                                range: `0-${response.totalcount - 1}`
                            }
                        }
                        response = await props.glpi[props.request.method](params) 
                    }

                    response.data.forEach(element => {
                        options.push(
                            {
                                content: element[props.request.content],
                                value: element[props.request.value]
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
                                content: element[props.request.content],
                                value: element[props.request.value]
                            }
                        )
                    })
                }
                break

            case 'getSubItems':
                response.forEach(element => {
                    options.push(
                        {
                            content: element[props.request.content],
                            value: element[props.request.value]
                        }
                    )
                })    
                break
            case 'getMyEntities':
                response.myentities.forEach(element => {
                    options.push(
                        {
                            content: element[props.request.content],
                            value: element[props.request.value]
                        }
                    )
                }) 
                break
            default:
                break
        }

        return options
    }

    componentDidMount = () => {
        this.handleRefresh(this.props)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps !== this.props) {
            this.handleRefresh(nextProps)
        }
    }

    handleRefresh = async (props) => {
        if (props.glpi && props.request) {

            this.setState ({
                options: await this.listRequest(props)
            })

        } else {
            let options = []
            props.options.forEach(element => {
                if (!element.name) {
                    options.push(
                        {
                            value: element,
                            content: element
                        }
                    )
                } else {
                    options.push(
                        {
                            value: element.value,
                            content: element.name
                        }
                    )
                }
            })

            this.setState ({ options })
        }
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
    