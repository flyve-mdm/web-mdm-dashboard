import React from 'react'

export default () => {
    let years = []
    for (let index = 1980; index <= 2100; index++) {
        years.push((
            <option value={index} key={`year${index}`}>
                { index }
            </option>
        ))
    }
    return years
}