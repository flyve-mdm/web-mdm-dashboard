import React from 'react'
import PropTypes from 'prop-types'

export default class IconItemList extends React.Component {
    render() {
        let size = this.props.size
        let backgroundColor = this.props.backgroundColor !== undefined ? this.props.backgroundColor : '#e6e6e6'
        var image = ""
        let style = {}
        if (this.props.type === "base64") {
            image = this.props.image
        } else {
            if (this.props.image !== undefined) {
                image = "images/" + this.props.image
            }
        }
        if (this.props.image !== undefined) {

            style = {
                lineHeight: size + 'px',
                width: size,
                height: size,
                display: 'inline-block'
            }

        } else {
            style = {
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
        }


        return (
            <div className="contentPicture" style={style}>
                <img src={image} height={size} width={size} alt="" />
            </div>
        )
    }
}
IconItemList.propTypes = {
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf(["file", "base64"])
}
