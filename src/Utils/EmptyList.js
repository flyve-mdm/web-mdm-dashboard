import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EmptyList extends Component {
    render () {
        const headerSize = this.props.headerSize ? this.props.headerSize : 0        
        const icon = this.props.icon ? this.props.icon : "fileIcon"

        return (
            <div style={{ marginTop: - headerSize, display: 'flex', height: '100%', justifyContent: 'center', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h4 className="win-h4" style={{ color: 'grey' }}>
                    <span className={icon} style={{fontSize: "40px", lineHeight: "60px"}}/> <br/>
                    { this.props.message } 
                </h4>
            </div>
        )
    }
}

EmptyList.propTypes = {
    message: PropTypes.string.isRequired,
    icon: PropTypes.string,
    headerSize: PropTypes.number    
}

export default EmptyList