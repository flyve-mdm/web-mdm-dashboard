import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class IconItemList extends PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            image: ''
        }
    }

    getImage = async () => {
        try {
            switch (this.props.image) {
                case 'profile.png':
                case 'android.png':
                case 'apple.png':
                case 'Phone.png':
                    this.setState({
                        image: require(`../../assets/images/${this.props.image}`)
                    })
                break
            
                default:
                    const url_base = localStorage.getItem('baseURL')
                    let url 
                    if (this.props.isMin) {
                        const image = this.props.image.split(".")
                        url = `//${url_base.split("//")[1]}/front/document.send.php?file=_pictures/${image[0]}_min.${image[1]}`
                    } else {
                        url = `//${url_base.split("//")[1]}/front/document.send.php?file=_pictures/${this.props.image}`
                    }

                    fetch (url, {
                        method: 'GET',
                        credentials: 'same-origin'
                    }).then((response) => {
                        response.arrayBuffer().then((buffer) => {
                            this.setState({
                                image: 'data:image/jpeg;base64,' + arrayBufferToBase64(buffer)
                            })
                        })
                    })
                      
                    function arrayBufferToBase64(buffer) {
                        let binary = ''
                        let bytes = [].slice.call(new Uint8Array(buffer))
                      
                        bytes.forEach((b) => binary += String.fromCharCode(b))
                      
                        return window.btoa(binary)
                    }
                break
            }
        } catch (error) {}
    }

    componentWillMount() {
        if (this.props.type !== 'file' || this.props.image === '') {
            this.setState({
                image: this.props.image
            })
        }
    }

    componentDidMount () {
        if (this.props.type === 'file' && this.props.image !== '') {
            this.getImage()
        }
    }

    render() {
        
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
                    <img alt="" src={this.state.image} style={style} onClick={this.props.imgClick}/>
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
    isMin: PropTypes.bool,
    imgClick: PropTypes.func,
    imgClass: PropTypes.string
}
