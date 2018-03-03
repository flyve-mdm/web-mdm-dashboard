import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GeolocationList extends Component {
    render() {
        let renderList
        if (this.props.locations.length > 0) {
            renderList = this.props.locations.map((location, index) => (
                <div key={`location-${index}`}>
                    <input 
                        type="checkbox" 
                        className="win-checkbox" 
                        style={{width: 'auto'}} 
                        onChange={() => this.showLocations(location)} 
                    /> 
                    <label>{ location['PluginFlyvemdmGeolocation.date'] }</label>
                </div>
            ))
        } else {
            renderList = (
                <p style={{ color: 'grey', marginLeft: 5 }}> 
                    No locations available
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