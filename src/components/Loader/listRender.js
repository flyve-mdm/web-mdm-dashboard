import React from 'react'
import ContentLoader, { BulletList } from 'react-content-loader'

const listRender = ({props, index}) => {
    if (props.type === "list") {
        return (<ContentLoader key={index} speed={1.5} style={{ width: '320px' }}>
            <circle cx="40" cy="45" r="27" />
            <rect x={80} y={20} rx={3} ry={3} width={250} height={10} radius={5} />
            <rect x={80} y={40} rx={3} ry={3} width={300} height={10} radius={5} />
            <rect x={80} y={60} rx={3} ry={3} width={260} height={10} radius={5} />
        </ContentLoader >)
    } else {
        return <BulletList key={index} speed={1.5} style={{ width: '320px' }}/>
    }
}

export default listRender