import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EmptyList extends Component {
    render () {
        const icon = this.props.icon ? this.props.icon : "fileIcon"

        return (
            <div className="listPane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top'  }}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h4 className="win-h4" style={{ color: 'grey' }}>
                        <span className={icon} style={{fontSize: "40px", lineHeight: "60px"}}/> <br/>
                        { this.props.message } 
                    </h4>
                </div>
            </div>
        )
    }
}

EmptyList.propTypes = {
    itemListPaneWidth: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    icon: PropTypes.string
}

export default EmptyList