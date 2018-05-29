import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const InfoBox = ({to, icon, count, name}) => {
    return (
        <Link to={to}>
            <div className="info-box">
                <span className="content-box">
                    {count}
                </span>
                <span className={'icon-box ' + icon} />
                <span className="title-box">
                    { name.toUpperCase() }
                </span>
            </div>
        </Link>
    )
}

InfoBox.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    name: PropTypes.string.isRequired,
}

export default InfoBox