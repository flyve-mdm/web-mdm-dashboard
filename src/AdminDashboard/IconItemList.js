import React from 'react'

export default class IconItemList extends React.Component {
    render() {
        let size = this.props.size
        return (
            <div
                className="profilePicture"
                style={{
                    backgroundColor: '#e6e6e6',
                    width: size,
                    height: size,
                    WebkitBorderRadius: size,
                    MozBorderRadius: size,
                    borderRadius: size,
                    backgroundSize: 'cover',
                    display: 'inline-block'
                }}
            >
                <img src="images/profile.png" height={size} width={size} alt="" />
            </div>
        )
    }
}
