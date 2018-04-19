import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { I18n } from "react-i18nify"

class GeolocationList extends Component {
    render() {
        let renderList
        if (this.props.locations.length > 0) {
            renderList = this.props.locations.map((location, index) => {
                return (
                    <div key={`location-${index}`} style={{paddingLeft:5}}>
                        <input 
                            type="checkbox" 
                            className="win-checkbox" 
                            style={{width: 'auto'}} 
                            onChange={() => this.props.showLocations(location)} 
                        /> 
                        <label>{ location.date }</label>
                    </div>
                )
            })
        } else {
            renderList = (
                <p style={{ color: 'grey', marginLeft:5}}> 
                    {I18n.t('devices.geolocation.no_locations')}
                </p>
            )
        }
        return renderList
    }
}

GeolocationList.propTypes = {
    locations: PropTypes.array.isRequired,
    showLocations: PropTypes.func.isRequired
}

export default GeolocationList