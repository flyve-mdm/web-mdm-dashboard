import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from '../../../../components/Forms'
import { I18n } from "react-i18nify"

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
                <p>{I18n.t('devices.geolocation.filter_range')}</p>
                <DatePicker
                    label={I18n.t('commons.min')}
                    name="min"
                    function={this.changeRange}
                    value={this.state.min}
                />
                <DatePicker
                    label={I18n.t('commons.max')}
                    name="max"
                    function={this.changeRange}
                    value={this.state.max}
                />
                <button
                    className="btn btn--primary"
                    style={{margin: '20px 0'}}
                    onClick={() => this.props.applyRange(
                        this.state.min,
                        this.state.max
                    )}
                >
                    {I18n.t('commons.filter')}
                </button>
            </React.Fragment>
        )
    }
}

GeolocationRange.propTypes = {
    min: PropTypes.string,
    max: PropTypes.string,
    applyRange: PropTypes.func
}