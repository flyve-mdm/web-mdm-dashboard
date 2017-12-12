import React from 'react'
import PropTypes from 'prop-types'

export default class IconItemList extends React.Component {
    render() {
        const size = this.props.size ? this.props.size : 100
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#e6e6e6'
        let image = this.props.image ? this.props.image : ''
        if (this.props.type !== "base64" && this.props.type !== "localFile" && this.props.image) {
            image = "images/" + this.props.image
        }
        const style = {
            lineHeight: size + 'px',
            backgroundColor: backgroundColor,
            width: size,
            height: size,
            WebkitBorderRadius: size,
            MozBorderRadius: size,
            borderRadius: size,
            backgroundSize: 'cover',
            display: 'inline-block'
        }

        return (
            <div className="contentPicture" style={style}>
                <img src={image} style={style} alt="" />
            </div>
        )
    }
}
IconItemList.propTypes = {
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf(["file", "base64", "localFile"])
}
