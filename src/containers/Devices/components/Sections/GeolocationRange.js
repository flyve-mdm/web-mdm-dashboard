import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from '../../../../components/Forms'

export default class GeolocationRange extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            min: this.props.min,
            max: this.props.max
        }
    }

    changeRange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <React.Fragment>
                <p>Show locations in a range of dates</p>
                <DatePicker
                    label="min"
                    name="min"
                    function={this.changeRange}
                    value={this.state.min}
                />
                <DatePicker
                    label="max"
                    name="max"
                    function={this.changeRange}
                    value={this.state.max}
                />
                <button className="btn btn--primary" style={{margin: '20px 0'}}>Filter</button>
            </React.Fragment>
        )
    }
}

GeolocationRange.propTypes = {
    min: PropTypes.string,
    max: PropTypes.string,
    applyRange: PropTypes.func
}