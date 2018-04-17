import React from 'react'
import PropTypes from 'prop-types'
import glpi from '../../shared/glpiApi'

export default class IconItemList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: ''
        }
    }

    getImage = async () => {
        try {
            if (this.props.image === 'profile.png') {
                this.setState({
                    image: require(`../../assets/images/${this.props.image}`)
                })
            } else {
                const { cfg_glpi } = await glpi.getGlpiConfig()
                this.setState({
                    image: await fetch(`https://${cfg_glpi.url_base.split("//")[1]}/front/document.send.php?file=_pictures/${this.props.image}`, {
                        method: 'GET',
                        credentials: 'same-origin'
                    })
                })
            }
        } catch (error) {}
    }

    componentWillMount() {
        this.getImage()
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
    imgClick: PropTypes.func,
    imgClass: PropTypes.string
}
