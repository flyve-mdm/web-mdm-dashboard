import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Select extends Component {
    render() {

        const options = this.props.options ? this.props.options : []
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <select className="win-dropdown" name={this.props.name} value={this.props.value} onChange={this.props.function}>
                    {   
                        options.map((element, index) => {
                            return (
                                <option value={element.value} key={index}>
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

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array,
    function: PropTypes.func
}

export default Select
    