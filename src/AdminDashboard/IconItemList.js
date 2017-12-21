import React from 'react'
import PropTypes from 'prop-types'

export default class IconItemList extends React.Component {
    render() {
        const image = (this.props.type === 'file' && this.props.image !== '') ? ("images/" + this.props.image) : this.props.image
        const style = {
            backgroundColor: this.props.backgroundColor,
            width: this.props.size,
            height: this.props.size,
            WebkitBorderRadius: this.props.size,
            MozBorderRadius: this.props.size,
            borderRadius: this.props.size,
            backgroundSize: 'cover',
            display: 'inline-block'
        }

        return (
            <div className="contentPicture" style={style}>
                <div className={this.props.imgClass} >
                    <img alt="" src={image} style={style} onClick={this.props.imgClick}/>
                </div>
            </div>
        )
    }
}

IconItemList.defaultProps = {
    size: 100,
    backgroundColor: '#e6e6e6',
    image: '',
    type: 'file'
}

IconItemList.propTypes = {
    size: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["file", "base64", "localFile"]).isRequired,
    imgClick: PropTypes.func,
    imgClass: PropTypes.string
}
