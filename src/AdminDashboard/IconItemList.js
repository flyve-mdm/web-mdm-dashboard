import React from 'react'

export default class IconItemList extends React.Component {
    render() {
        let size = this.props.size
        return (
            <div
                className="profilePicture"
                style={{
                    backgroundColor: '#BBBBBB',
                    width: size,
                    height: size,
                    WebkitBorderRadius: size,
                    MozBorderRadius: size,
                    borderRadius: size,
                    backgroundSize: 'cover',
                    display: 'inline-block'
                }}
            >
                <img src="images/" height={size} width={size} alt="" />
            </div>
        )
    }
}
