import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'

class DatePicker extends Component {

    change = (eventObject) => {
        const datePicker = eventObject.currentTarget.winControl
        this.props.function(this.props.name, datePicker.current)
    }

    render() {
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                <ReactWinJS.DatePicker current={this.props.value} onChange={this.change} />
            </div>
        )
    }
}

DatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    function: PropTypes.func
}

export default DatePicker
    