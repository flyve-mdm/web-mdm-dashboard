import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

export default class Loader extends Component {

    listRender = (index) => {
        return (< ContentLoader key={index} speed={1.5} style={{ width: '360px' }}>
            <circle cx="40" cy="45" r="27" />
            <rect x={80} y={20} rx={3} ry={3} width={250} height={10} radius={5} />
            <rect x={80} y={40} rx={3} ry={3} width={300} height={10} radius={5} />
            <rect x={80} y={60} rx={3} ry={3} width={260} height={10} radius={5} />
        </ContentLoader >)
    }

    render() {
        let content = []

        for (let index = 0; index < this.props.count; index++) {
            content = [
                ...content,
                this.listRender(index)
            ]
        }
        return (
            <div>{ content }</div>
        )
    }
}
Loader.propTypes = {
    count: PropTypes.number,
    type: PropTypes.oneOf(["list"])
}
Loader.defaultProps = {
    count: 1,
    type: "list"
}
