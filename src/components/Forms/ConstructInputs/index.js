import React from 'react'
import PropTypes from 'prop-types'

import createListElement from './createListElement'

const ConstructInputs = props => {
    let icon
    
    if (props.icon) {
        icon = (
            <div className="listElement listElementIcon">
                <span className={props.icon}/>
                {props.title ? <span style={{ marginLeft: '10px' }}>{props.title}</span> : null }
            </div>
        )
    }

    return (
        <React.Fragment>
            { icon }
            {   
                props.data.map((elements, index) => {
                    return createListElement({
                        icon: props.icon,
                        elements: elements, 
                        index: index
                    })
                })
            }
        </React.Fragment>
    ) 
}

ConstructInputs.propTypes = {
    data: PropTypes.array.isRequired, 
    icon: PropTypes.string,
    title: PropTypes.string
}

export default ConstructInputs
    