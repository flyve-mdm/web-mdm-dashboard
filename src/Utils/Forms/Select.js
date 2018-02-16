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

    componentDidMount = async () => {
        if (this.props.glpi && this.props.request) {
            const response = await this.props.glpi[this.props.request.method](this.props.request.params)

            let options = []

            switch (this.props.request.method) {
                case 'getMyProfiles':
                    response.myprofiles.forEach(element => {
                        options = [
                            ...options, 
                            {
                                content: element[this.props.request.content],
                                value: element[this.props.request.value]
                            }
                        ]
                    })
                    break
                
                case 'searchItems':
                    if (response.data) {
                        response.data.forEach(element => {
                            options = [
                                ...options, 
                                {
                                    content: element[this.props.request.content],
                                    value: element[this.props.request.value]
                                }
                            ]
                        })
                    }
                    break
                    case 'getAllItems':
                    if (response) {
                        response.forEach(element => {
                            options = [
                                ...options, 
                                {
                                    content: element[this.props.request.content],
                                    value: element[this.props.request.value]
                                }
                            ]
                        })
                    }
                    break

                case 'getSubItems':
                    response.forEach(element => {
                        options = [
                            ...options, 
                            {
                                content: element[this.props.request.content],
                                value: element[this.props.request.value]
                            }
                        ]
                    })    
                    break
                case 'getMyEntities':
                    response.myentities.forEach(element => {
                        options = [
                            ...options, 
                            {
                                content: element[this.props.request.content],
                                value: element[this.props.request.value]
                            }
                        ]
                    }) 
                    break
                default:
                    break
            }
            this.setState ({
                options
            })
        }
    }

    render() {
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <select className="win-dropdown" name={this.props.name} value={this.props.value} onChange={this.change}>
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
    label: PropTypes.string.isRequired,
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
    