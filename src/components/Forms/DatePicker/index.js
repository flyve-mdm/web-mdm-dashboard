import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YEARS from './years'
import MONTHS from './months'
import DAYS from './days'
import monthsList from './monthsList.json'

class DatePicker extends Component {

    constructor (props) {
        super(props)
        const date = new Date (this.props.value)
        this.state = {
            year: this.props.value ? date.getFullYear() : undefined,
            month: this.props.value ? monthsList[date.getMonth()] : undefined,
            day: this.props.value ? date.getDate() : undefined
        }
    }

    change = (eventObject) => {
        const currentDate = new Date()
        let newDate = { 
            year: this.state.year ? this.state.year : currentDate.getFullYear(),
            month: this.state.month ? this.state.month : monthsList[currentDate.getMonth()],
            day: this.state.day ? this.state.day : 1
        }

        newDate[eventObject.target.name] = eventObject.target.value

        this.setState({ ...newDate },
            this.props.function(this.props.name, new Date (`${newDate.year} ${newDate.month} ${newDate.day}`))
        )
    }

    render () {
        return (
            <div className="froms__col">

                <p>{this.props.label}</p>

                <div className="win-disposable win-datepicker">
                    <select className="win-datepicker-month win-dropdown win-order0" name="month" value={this.state.month} onChange={this.change}>
                        <option>
                            ---
                        </option>
                        { MONTHS () }
                    </select>

                    <select className="win-datepicker-date win-dropdown win-order1" name="day" value={this.state.day} onChange={this.change}>
                        <option>
                            ---
                        </option>
                        { DAYS (this.state.year, this.state.month) }
                    </select>

                    <select className="win-datepicker-year win-dropdown win-order2" name="year" value={this.state.year} onChange={this.change}>
                        <option>
                            ---
                        </option>
                        { YEARS () }
                    </select>
                </div>
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
    value: PropTypes.instanceOf(Date),
    function: PropTypes.func.isRequired
}

export default DatePicker