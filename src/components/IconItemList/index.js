import React from 'react'
import PropTypes from 'prop-types'

const IconItemList = props => {
    const image = (this.props.type === 'file' && this.props.image !== '') ? ("images/" + this.props.image) : this.props.image
    
    let style = {
        backgroundColor: this.props.backgroundColor,
        width: this.props.size,
        height: this.props.size,
        backgroundSize: 'cover',
        display: 'inline-block'
    }

    let className = ''
    
    if (this.props.type !== 'base64') {
        className = 'contentPicture'
        style = {
            ...style,
            WebkitBorderRadius: this.props.size,
            MozBorderRadius: this.props.size,
            borderRadius: this.props.size
        }
    }

    return (
        <div className={className} style={style}>
            <div className={this.props.imgClass} >
                <img alt="" src={image} style={style} onClick={this.props.imgClick}/>
            </div>
        </div>
    )
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

export default IconItemList