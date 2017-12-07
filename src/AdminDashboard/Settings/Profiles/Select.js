import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    render() {

        const options = this.props.options ? this.props.options : []
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <select className="win-dropdown" name={this.props.name} value={this.props.value}>
                    {   
                        options.map((element, index) => {
                            return (
                                <option value={element.value} key={index} onChange={this.props.function}>
                                    { element.label }
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array,
    function: PropTypes.func
}

export default Input
    